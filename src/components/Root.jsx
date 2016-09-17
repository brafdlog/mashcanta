import React from 'react';
import { FABButton, Icon } from 'react-mdl';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import CostOfDollarGraph from './graphs/CostOfDollarGraph';
import PaymentsGraph from './graphs/PaymentsGraph';
import { observer } from 'mobx-react';
import { KEREN_SHAVA, SHPITZER } from '../consts';
import './Root.scss';

const { shape, oneOf, arrayOf, string, number, bool } = React.PropTypes;

@observer
class Root extends React.Component {

    static propTypes = {
        currentMortgage: shape({
            id: string,
            loanAmount: number,
            monthlyPayment: number,
            totalPaymentToBank: number,
            costOfEachDollar: number,
            paymentDetailsPerMonth: arrayOf(shape({
                principal: number,
                interest: number
            })),
            mortgageParts: arrayOf(shape({
                id: string,
                order: number,
                loanAmount: number,
                numYears: number,
                yearlyInterest: number,
                amortizationType: oneOf([KEREN_SHAVA, SHPITZER])
            }))
        }),
        isLoading: bool
    }

    render() {
        const { currentMortgage, isLoading } = this.props;
        const { mortgageParts, loanAmount, totalPaymentToBank, paymentDetailsPerMonth, loanCost } = currentMortgage;

        const showGraph = loanAmount && totalPaymentToBank > 0;

        if (isLoading) {
            return (
                <div className='loaderContainer'>
                    <div className='loader'></div>
                </div>
            );
        }
        return (
            <div className='container-fluid rootAppContainer'>
                <div className='row'>
                    <div className='col-md-5'>
                        <MortgageInfoInputForm mortgageParts={mortgageParts} handleChange={this.onUpdateMortgagePart}
                            handleDelete={this.onDeletePart} handleMoveUp={this.onMovePartUp} handleMoveDown={this.onMovePartDown}
                        />
                        <FABButton className='addButton' mini ripple onClick={this.onAddNewPart}>
                            <Icon name='add' />
                        </FABButton>
                    </div>
                    <div className='col-md-2 MortgageDetailsDisplayContainer'>
                        <MortgageDetailsDisplay mortgageInfo={currentMortgage} />
                    </div>
                    <div className='col-md-3 col-md-offset-1'>
                        {showGraph ? <CostOfDollarGraph className='costGraph' loanAmount={loanAmount} loanCost={loanCost} /> : ''}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        {showGraph ? <PaymentsGraph loanAmount={loanAmount} loanCost={loanCost} paymentDetailsPerMonth={paymentDetailsPerMonth} yearlyGraph={this.state.paymentGraphYearly} handleUpdateGranularity={this.updatePaymentGraphGranularity} /> : ''}
                    </div>
                </div>
            </div>
        );
    }

    state = {};

    onDeletePart = (partId) => {
        const mortgage = this.props.currentMortgage;
        mortgage.deletePart(partId);
    }

    onAddNewPart = () => {
        const mortgage = this.props.currentMortgage;
        mortgage.addPart();
    }

    updatePaymentGraphGranularity = (newGranularity) => {
        this.setState({ paymentGraphYearly: newGranularity === 'yearly' });
    }

    onUpdateMortgagePart = (updatedMortgagePart) => {
        const mortgage = this.props.currentMortgage;
        mortgage.updatePart(updatedMortgagePart.id, updatedMortgagePart);
    }

    onMovePartUp = (partId) => {
        const mortgage = this.props.currentMortgage;
        mortgage.movePartUp(partId);
    }

    onMovePartDown = (partId) => {
        const mortgage = this.props.currentMortgage;
        mortgage.movePartDown(partId);
    }

    onClearClicked = () => {
        const mortgage = this.props.currentMortgage;
        mortgage.reset();
    }

}

export default Root;