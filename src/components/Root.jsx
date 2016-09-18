import React from 'react';
import { FABButton, Icon } from 'react-mdl';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import CostOfDollarGraph from './graphs/CostOfDollarGraph';
import { ManageMortgagesRow } from './ManageMortgagesRow';
import PaymentsGraph from './graphs/PaymentsGraph';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { KEREN_SHAVA, SHPITZER } from '../consts';
import { getConfig } from '../config';
import str from '../localization';
import { signIn, signOut, isAuthEnabled } from '../auth';
import './Root.scss';

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
            })),
            isLoading: bool
        })
    }

    render() {
        const { currentMortgage, isLoading, createNewMortgage, mortgages } = this.props.stateStore;
        const { mortgageParts, loanAmount, totalPaymentToBank, paymentDetailsPerMonth, loanCost } = currentMortgage;
        const showAddMortgageRow = getConfig('showAddMortgageRow');
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
                {showAddMortgageRow ?
                    <ManageMortgagesRow currentMortgage={currentMortgage} onChangeCurrentMortgage={this.onChangeCurrentMortgage} mortgages={mortgages.toJS()} createNewMortgage={createNewMortgage} /> : null
                }
                {this.generateLoginRow()}
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

    generateLoginRow = () => {
        if (!isAuthEnabled()) {
            return null;
        }
        if (this.props.stateStore.user) {
            return <button type='button' className='btn btn-default' onClick={signOut}>{str('logout')}</button>;
        } else {
            return <button type='button' className='btn btn-default' onClick={signIn}>{str('login')}</button>;
        }
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

    updatePaymentGraphGranularity = (newGranularity) => {
        this.setState({ paymentGraphYearly: newGranularity === 'yearly' });
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