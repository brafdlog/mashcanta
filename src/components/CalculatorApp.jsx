import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './CalculatorApp.scss';
import Icon from './Icon';
import PaymentsTable from './PaymentsTable';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import CostOfDollarGraph from './graphs/CostOfDollarGraph';
import ManageMortgagesRow from './ManageMortgagesRow';
import PaymentsGraph from './graphs/PaymentsGraph';
import { CSS, MORTGAGE_SHAPE } from '../consts';
import str from '../localization';
import { getConfig } from '../config';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';

// Loaders are specified explicitly because we don't want css modules to run during the loading of these files
import '!style!css!react-select/dist/react-select.css';

const { shape, string, bool } = PropTypes;

@observer
class CalculatorApp extends React.Component {

    static propTypes = {
        stateStore: shape({
            mortgages: MobxPropTypes.observableArrayOf(MORTGAGE_SHAPE),
            isLoading: bool,
            className: string
        }),
        isSmallScreen: bool
    }

    render() {
        const { currentMortgage, createNewMortgage, mortgages } = this.props.stateStore;
        const { mortgageParts, loanAmount, loanCost, paymentDetailsPerYearMonthlyAverage, paymentDetailsPerMonth } = currentMortgage;
        const { showPaymentsGraph } = this.state;
        const showAddMortgageRow = getConfig('showAddMortgageRow');
        const isEmptyData = !currentMortgage.hasValidParts;
        return (
            <div className={cx('container-fluid', styles.content, styles.calculatorApp, this.props.className)}>
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
                    <div className={cx(styles.graphColumn, 'col-md-8', 'col-xs-12')}>
                        <h3 className={styles.graphTitle}>{showPaymentsGraph ? str('paymentsGraph') : str('paymentsTable')}</h3>
                        {isEmptyData ?
                            null :
                            <div className={styles.graphTableSelectorContainer}>
                                <Icon className={styles.icon} id='bar-chart' onClick={this.showPaymentsGraph} color={showPaymentsGraph ? CSS.purple : null} height={20} />
                                <Icon className={styles.icon} id='table' onClick={this.showPaymentsTable} color={showPaymentsGraph ? null : CSS.purple} height={20} />
                            </div>
                        }
                        {showPaymentsGraph ?
                            <PaymentsGraph loanAmount={loanAmount} loanCost={loanCost} paymentDetailsPerYear={paymentDetailsPerYearMonthlyAverage}
                                isEmptyData={isEmptyData} maxElements={this.props.isSmallScreen ? 15 : 40}
                            /> :
                            <PaymentsTable paymentDetailsPerMonth={paymentDetailsPerMonth} />
                        }
                    </div>
                    <div className={cx(styles.graphColumn, 'col-md-4', 'col-xs-12')}>
                        <CostOfDollarGraph className={styles.costGraph} loanAmount={loanAmount} loanCost={loanCost} isEmptyData={isEmptyData} />
                    </div>
                </div>
            </div>
        );
    }

    state = {
        showPaymentsGraph: true
    }

    showPaymentsGraph = () => this.setShowPaymentGraph(true);

    showPaymentsTable = () => this.setShowPaymentGraph(false);

    setShowPaymentGraph = showPaymentsGraph => {
        const currentScrollX = window.scrollX;
        const currentScrollY = window.scrollY;
        if (this.state.showPaymentsGraph !== showPaymentsGraph) {
            this.setState({
                showPaymentsGraph
            }, () => {
                // Fix bug that when clicking show graph icon, the scoll y position would jump
                scrollTo(currentScrollX, currentScrollY);
            });
        }
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

export default CalculatorApp;