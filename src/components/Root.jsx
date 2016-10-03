import React from 'react';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import CostOfDollarGraph from './graphs/CostOfDollarGraph';
import ManageMortgagesRow from './ManageMortgagesRow';
import LoginRow from './LoginRow';
import Modal from './Modal';
import LoginModal from './LoginModal';
import PaymentsGraph from './graphs/PaymentsGraph';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { KEREN_SHAVA, SHPITZER, GOOGLE, FACEBOOK } from '../consts';
import { getConfig } from '../config';
import { signIn, signOut, isAuthEnabled } from '../services/authService';
import styles from './Root.scss';
import cx from 'classnames';
// Loaders are specified explicitly because we don't want css modules to run during the loading of these files
import '!style!css!bootstrap/dist/css/bootstrap.css';
import '!style!css!bootstrap-rtl/dist/css/bootstrap-rtl.css';

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
        const { mortgageParts, loanAmount, loanCost, paymentDetailsPerYearMonthlyAverage } = currentMortgage;
        const showAddMortgageRow = getConfig('showAddMortgageRow');
        if (isLoading) {
            return (
                <Modal>
                    <div className={styles.loader}></div>
                </Modal>
            );
        }
        return (
            <div className={cx('container-fluid', styles.rootAppContainer)}>
                {this.state.showLoginModal ?
                    <Modal zIndex={150} positionFixed>
                        <LoginModal facebookLogin={this.facebookLogin} googleLogin={this.googleLogin} closeModal={this.closeLoginModal} />
                    </Modal> : null
                }
                {isAuthEnabled() ?
                    <LoginRow className={styles.loginRow} user={user} facebookLogin={this.facebookLogin} googleLogin={this.googleLogin} signIn={signIn}
                        signOut={signOut}
                    /> : null
                }
                {showAddMortgageRow ?
                    <ManageMortgagesRow currentMortgage={currentMortgage} onChangeCurrentMortgage={this.onChangeCurrentMortgage} mortgages={mortgages.toJS()} createNewMortgage={createNewMortgage} /> : null
                }
                <div className='row'>
                    <div className={cx('col-md-12', styles.mortgageInputFormColumn)}>
                        <MortgageInfoInputForm mortgageParts={mortgageParts} handleChange={this.onUpdateMortgagePart}
                            handleDelete={this.onDeletePart} handleMoveUp={this.onMovePartUp} handleMoveDown={this.onMovePartDown}
                            handleAddPart={this.onAddNewPart}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className={cx('col-md-12', styles.MortgageDetailsDisplayContainer)}>
                        <MortgageDetailsDisplay mortgageInfo={currentMortgage} />
                    </div>
                </div>
                <div className={cx('row', styles.graphsRow, styles.equalHeightColumns)}>
                    <div className={cx(styles.graphColumn, 'col-md-9', 'col-xs-12')}>
                        <PaymentsGraph loanAmount={loanAmount} loanCost={loanCost} paymentDetailsPerYear={paymentDetailsPerYearMonthlyAverage}
                            isEmptyData={!currentMortgage.hasValidParts} maxElements={this.isSmallScreen ? 15 : 40}
                        />
                    </div>
                    <div className={cx(styles.graphColumn, 'col-md-3', 'col-xs-12')}>
                        <CostOfDollarGraph className={styles.costGraph} loanAmount={loanAmount} loanCost={loanCost} isEmptyData={!currentMortgage.hasValidParts} />
                    </div>
                </div>
            </div>
        );
    }

    state = {
        showLoginModal: false
    };

    componentDidMount = () => {
        $('.loginButton').off('click').on('click', this.openLoginModal);
    }

    componentWillUnmount = () => {
        $('.loginButton').off('click');
    }

    closeLoginModal = () => {
        this.setState({
            showLoginModal: false
        });
    }

    openLoginModal = () => {
        this.setState({
            showLoginModal: true
        });
    }

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