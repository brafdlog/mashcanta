import React from 'react';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import CostOfDollarGraph from './graphs/CostOfDollarGraph';
import { ManageMortgagesRow } from './ManageMortgagesRow';
import { LoginRow } from './LoginRow';
import PaymentsGraph from './graphs/PaymentsGraph';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { KEREN_SHAVA, SHPITZER, GOOGLE, FACEBOOK } from '../consts';
import { getConfig } from '../config';
import { signIn, signOut, isAuthEnabled } from '../services/authService';
import styles from './Root.scss';
import cx from 'classnames';

const { shape, oneOf, arrayOf, string, number, bool } = React.PropTypes;

@observer
class Root extends React.Component {

    static propTypes = {
        stateStore: shape({
            mortgages: MobxPropTypes.observableArrayOf(shape({
                id: string,
                loanAmount: number,
                monthlyPayment: number,
                totalPaymentToBank: number,
                costOfEachDollar: number,
                paymentDetailsPerMonth: arrayOf(shape({
                    principal: number,
                    interest: number,
                    total: number
                })),
                paymentDetailsPerYearMonthlyAverage: arrayOf(shape({
                    principal: number,
                    interest: number,
                    total: number
                })),
                mortgageParts: arrayOf(shape({
                    id: string,
                    order: number,
                    loanAmount: number,
                    numYears: number,
                    yearlyInterest: number,
                    amortizationType: oneOf([KEREN_SHAVA, SHPITZER])
                }))
            })),
            isLoading: bool
        })
    }

    constructor(props) {
        super(props);
        this.isSmallScreen = window.isSmallScreen;
    }

    render() {
        const { currentMortgage, isLoading, createNewMortgage, mortgages, user } = this.props.stateStore;
        const { mortgageParts, loanAmount, totalPaymentToBank, loanCost, paymentDetailsPerYearMonthlyAverage } = currentMortgage;
        const showAddMortgageRow = getConfig('showAddMortgageRow');
        const showGraph = loanAmount && totalPaymentToBank > 0;
        if (isLoading) {
            return (
                <div className={styles.loaderContainer}>
                    <div className={styles.loader}></div>
                </div>
            );
        }
        return (
            <div className={cx('container-fluid', styles.rootAppContainer)}>
                {isAuthEnabled() ?
                    <LoginRow user={user} facebookLogin={this.facebookLogin} googleLogin={this.googleLogin} signIn={signIn} signOut={signOut} /> : null
                }
                {showAddMortgageRow ?
                    <ManageMortgagesRow currentMortgage={currentMortgage} onChangeCurrentMortgage={this.onChangeCurrentMortgage} mortgages={mortgages.toJS()} createNewMortgage={createNewMortgage} /> : null
                }
                <div className='row'>
                    <div className={cx('col-md-5', styles.mortgageInputFormColumn)}>
                        <MortgageInfoInputForm mortgageParts={mortgageParts} handleChange={this.onUpdateMortgagePart}
                            handleDelete={this.onDeletePart} handleMoveUp={this.onMovePartUp} handleMoveDown={this.onMovePartDown}
                            handleAddPart={this.onAddNewPart}
                        />
                    </div>
                    <div className={cx('col-md-2', styles.MortgageDetailsDisplayContainer)}>
                        <MortgageDetailsDisplay mortgageInfo={currentMortgage} />
                    </div>
                    <div className='col-md-3 col-md-offset-1'>
                        {showGraph ? <CostOfDollarGraph className={styles.costGraph} loanAmount={loanAmount} loanCost={loanCost} /> : ''}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        {showGraph ?
                            <PaymentsGraph loanAmount={loanAmount} loanCost={loanCost} paymentDetailsPerYear={paymentDetailsPerYearMonthlyAverage}
                                maxElements={this.isSmallScreen ? 15 : 40}
                            /> : ''}
                    </div>
                </div>
            </div>
        );
    }

    state = {};

    facebookLogin = () => {
        signIn(FACEBOOK);
    };

    googleLogin = () => {
        signIn(GOOGLE);
    };

    onChangeCurrentMortgage = ({ target }) => {
        this.props.stateStore.setCurrentMortgageId(target.value);
    }

    onDeletePart = (partId) => {
        const mortgage = this.getCurrentMortgage();
        mortgage.deletePart(partId);
    }

    onAddNewPart = () => {
        const mortgage = this.getCurrentMortgage();
        mortgage.addPart();
    }

    onUpdateMortgagePart = (updatedMortgagePart) => {
        const mortgage = this.getCurrentMortgage();
        mortgage.updatePart(updatedMortgagePart.id, updatedMortgagePart);
    }

    onMovePartUp = (partId) => {
        const mortgage = this.getCurrentMortgage();
        mortgage.movePartUp(partId);
    }

    onMovePartDown = (partId) => {
        const mortgage = this.getCurrentMortgage();
        mortgage.movePartDown(partId);
    }

    onClearClicked = () => {
        const mortgage = this.getCurrentMortgage();
        mortgage.reset();
    }

    getCurrentMortgage = () => {
        return this.props.stateStore.currentMortgage;
    }

}

export default Root;