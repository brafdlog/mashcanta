import React from 'react';
import _ from 'lodash';
import { FABButton, Icon } from 'react-mdl';
import { generateId } from '../utils';
import Flex from './Flex.jsx';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import CostOfDollarGraph from './graphs/CostOfDollarGraph';
import PaymentsGraph from './graphs/PaymentsGraph';
import * as Calculator from '../calculator';
import { getFromStorage, saveToStorage } from '../storage';

import './Root.scss';
import pureRender from 'pure-render-decorator';

const EMPTY_STATE = {
    mortgageInfo: {
        mortgageParts: [

        ]
    }
};

@pureRender
class Root extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...EMPTY_STATE,
            loading: true
        };
    }

    render() {
        const { mortgageParts } = this.state.mortgageInfo;
        const calculatedMortgageInfoParts = this.state.mortgageInfo.mortgageParts.map(mortgagePart => Calculator.getMortgagePartInfo(mortgagePart));

        const loanDetails = Calculator.mergeMortgateInfoParts(calculatedMortgageInfoParts);
        const loanAmount = loanDetails.loanAmount;
        const loanCost = loanDetails.totalPaymentToBank - loanAmount;
        const showGraph = loanAmount && loanDetails.totalPaymentToBank > 0;
        if (this.state.loading) {
            return (
                <div className='loaderContainer'>
                    <div className='loader'></div>
                </div>
            );
        }
        return (
            <div className='container-fluid rootAppContainer'>
                <div className='row'>
                    <div className='col-md-6'>
                        <Flex className='container' column >
                            <MortgageInfoInputForm mortgageParts={mortgageParts} handleChange={this.onUpdateMortgagePart}
                                handleDelete={this.onDeletePart} handleMoveUp={this.onMovePartUp} handleMoveDown={this.onMovePartDown}
                            />
                            <FABButton className='addButton' mini ripple onClick={this.onAddNewPart}>
                                <Icon name='add' />
                            </FABButton>
                        </Flex>
                    </div>
                    <div className='col-md-4 MortgageDetailsDisplayContainer'>
                        <MortgageDetailsDisplay mortgageInfo={loanDetails} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        {showGraph ? <CostOfDollarGraph className='costGraph' loanAmount={loanAmount} loanCost={loanCost} /> : ''}
                    </div>
                    <div className='col-md-9'>
                        {showGraph ? <PaymentsGraph loanAmount={loanAmount} loanCost={loanCost} paymentDetailsPerMonth={loanDetails.paymentDetailsPerMonth} maxXElements={20} /> : ''}
                    </div>
                </div>
            </div>
        );
    }

    state = EMPTY_STATE;

    componentDidMount() {
        /* eslint react/no-did-mount-set-state: "off" */
        getFromStorage('mortgageInfo').then(storedMortgageInfo => {
            const mortgageInfoState = storedMortgageInfo ? { mortgageInfo: storedMortgageInfo } : {};
            this.setState({
                ...mortgageInfoState,
                loading: false
            });
        });
    }

    onMovePartUp = partId => {
        const mortgageParts = [...this.state.mortgageInfo.mortgageParts];
        const partIndex = _.findIndex(mortgageParts, ['id', partId]);
        if (partIndex > 0) {
            this.swapPartOrder(mortgageParts, partIndex, partIndex - 1);
        }
    }

    onMovePartDown = partId => {
        const mortgageParts = [...this.state.mortgageInfo.mortgageParts];
        const partIndex = _.findIndex(mortgageParts, ['id', partId]);
        const isLastPart = partIndex === mortgageParts.length - 1;
        if (!isLastPart) {
            this.swapPartOrder(mortgageParts, partIndex, partIndex + 1);
        }
    }

    swapPartOrder(mortgageParts, firstPartIndex, secondPartIndex) {
        const firstPart = { ...mortgageParts[firstPartIndex]};
        mortgageParts[firstPartIndex] = firstPart;
        const secondPart = { ...mortgageParts[secondPartIndex]};
        mortgageParts[secondPartIndex] = secondPart;
        const partOrder = firstPart.order;
        firstPart.order = secondPart.order;
        secondPart.order = partOrder;
        this.setUpdatedMortgageParts(mortgageParts);
    }

    onDeletePart = partId => {
        let mortgageParts = [...this.state.mortgageInfo.mortgageParts];
        mortgageParts = mortgageParts.filter(part => part.id !== partId);
        this.setUpdatedMortgageParts(mortgageParts);
    }

    onAddNewPart = () => {
        const mortgageParts = [...this.state.mortgageInfo.mortgageParts];

        const newMortgagePart = {
            id: generateId(),
            order: mortgageParts.length,
            loanAmount: 0,
            numYears: 0,
            yearlyInterest: 0,
            monthlyPayment: 0
        };
        mortgageParts.push(newMortgagePart);
        this.setUpdatedMortgageParts(mortgageParts);
    }

    onUpdateMortgagePart = updatedMortgagePart => {
        // Clear the monthly payment so it will be recalculated
        updatedMortgagePart.monthlyPayment = null;
        const calculatedInfo = Calculator.getMortgagePartInfo(updatedMortgagePart);
        updatedMortgagePart.monthlyPayment = calculatedInfo.monthlyPayment || 0;

        const mortgageParts = [...this.state.mortgageInfo.mortgageParts];
        const index = _.findIndex(mortgageParts, ['id', updatedMortgagePart.id]);
        mortgageParts[index] = updatedMortgagePart;
        this.setUpdatedMortgageParts(mortgageParts);
    }

    setUpdatedMortgageParts = updatedMorgageParts => {
        // Sort parts by order
        updatedMorgageParts.sort((part1, part2) => part1.order - part2.order);
        const updatedMortgageInfo = { ...this.state.mortgageInfo, mortgageParts: updatedMorgageParts };
        this.setState({ mortgageInfo: updatedMortgageInfo });
        saveToStorage('mortgageInfo', updatedMortgageInfo);
    }

    onClearClicked = () => {
        this.setState(EMPTY_STATE);
    }

}

export default Root;