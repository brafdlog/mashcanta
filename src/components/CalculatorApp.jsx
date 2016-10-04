import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './CalculatorApp.scss';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import CostOfDollarGraph from './graphs/CostOfDollarGraph';
import ManageMortgagesRow from './ManageMortgagesRow';
import PaymentsGraph from './graphs/PaymentsGraph';
import { KEREN_SHAVA, SHPITZER } from '../consts';
import { getConfig } from '../config';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';

// Loaders are specified explicitly because we don't want css modules to run during the loading of these files
import '!style!css!react-select/dist/react-select.css';

const { shape, number, arrayOf, string, oneOf, bool } = PropTypes;

@observer
class CalculatorApp extends React.Component {

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

    render() {
        const { currentMortgage, createNewMortgage, mortgages } = this.props.stateStore;
        const { mortgageParts, loanAmount, loanCost, paymentDetailsPerYearMonthlyAverage } = currentMortgage;
        const showAddMortgageRow = getConfig('showAddMortgageRow');
        return (
            <div className={cx('container-fluid', styles.content, styles.calculatorApp)}>
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
                <div className={cx('row', styles.graphsRow, 'equalHeightColumns')}>
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

export default CalculatorApp;