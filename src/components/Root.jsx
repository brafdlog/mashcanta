import React from 'react';
import _ from 'lodash';
import { generateId } from '../utils';
import Flex from './Flex.jsx';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import AddNewPart from './AddNewPart';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import * as Calculator from '../calculator';
import './Root.scss';

const EMPTY_STATE = {
    mortgageInfo: {
        mortgageParts: [

        ]
    }
};

class Root extends React.Component {

    constructor(props) {
        super(props);
        const storedInfo = this.getFromStorage();
        const initialState = storedInfo ? { mortgageInfo: storedInfo } : EMPTY_STATE;
        this.state = initialState;
    }

    render() {
        const { mortgageParts } = this.state.mortgageInfo;
        return (
            <Flex className='container rootAppContainer'>
                <Flex className='container' column >
                    <MortgageInfoInputForm mortgageParts={mortgageParts} handleChange={this.onUpdateMortgagePart}
                        handleDelete={this.onDeletePart} handleMoveUp={this.onMovePartUp} handleMoveDown={this.onMovePartDown}
                    />
                    <AddNewPart handleAddPart={this.onAddNewPart} handleClearClicked={this.onClearClicked} />
                </Flex>
                <Flex className='container MortgageDetailsDisplayContainer' column>
                    <MortgageDetailsDisplay mortgageInfo={this.calculateDetailsDisplayDetails()} />
                </Flex>
            </Flex>
        );
    }

    state = EMPTY_STATE;

    getFromStorage = () => {
        const infoFromStorage = localStorage.getItem('mortgageInfo');
        return infoFromStorage && JSON.parse(infoFromStorage);
    }

    saveToStorage = (infoToSave) => {
        const infoJson = JSON.stringify(infoToSave);
        localStorage.setItem('mortgageInfo', infoJson);
    }

    calculateDetailsDisplayDetails = () => {
        const calculatedMortgageInfoParts = this.state.mortgageInfo.mortgageParts.map(mortgagePart => Calculator.getMortgageInfo(mortgagePart));
        let loanAmount = 0;
        let monthlyPayment = 0;
        let totalPaymentToBank = 0;
        calculatedMortgageInfoParts.forEach(mortgagePart => {
            loanAmount += mortgagePart.loanAmount;
            monthlyPayment += mortgagePart.monthlyPayment;
            totalPaymentToBank += mortgagePart.totalPaymentToBank;
        });
        const costOfEachDollar = totalPaymentToBank / loanAmount;

        return {
            loanAmount,
            monthlyPayment,
            totalPaymentToBank,
            costOfEachDollar
        };
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

    onAddNewPart = ({ numYears, yearlyInterest, loanAmount }) => {
        const mortgageParts = [...this.state.mortgageInfo.mortgageParts];

        const newMortgagePart = {
            id: generateId(),
            order: mortgageParts.length,
            loanAmount,
            numYears,
            yearlyInterest
        };
        const calculatedInfo = Calculator.getMortgageInfo(newMortgagePart);
        newMortgagePart.monthlyPayment = calculatedInfo.monthlyPayment;

        mortgageParts.push(newMortgagePart);
        this.setUpdatedMortgageParts(mortgageParts);
    }

    onUpdateMortgagePart = updatedMortgagePart => {
        // Clear the monthly payment so it will be recalculated
        updatedMortgagePart.monthlyPayment = null;
        const calculatedInfo = Calculator.getMortgageInfo(updatedMortgagePart);
        updatedMortgagePart.monthlyPayment = calculatedInfo.monthlyPayment;

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
        this.saveToStorage(updatedMortgageInfo);
    }

    onClearClicked = () => {
        this.setState(EMPTY_STATE);
    }

}

export default Root;