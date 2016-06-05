import React from 'react';
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
                    <MortgageInfoInputForm mortgageParts={mortgageParts} handleChange={this.onChangeMortgageInfoInput} />
                    <AddNewPart handleAddPart={this.onAddNewPart} handleClearClicked={this.onClearClicked} />
                </Flex>
                <Flex className='container MortgageDetailsDisplayContainer' column>
                    <MortgageDetailsDisplay mortgageInfo={this.calculateDetailsDisplayDetails()} />
                </Flex>
            </Flex>
        );
    }

    state = {
        mortgageInfo: {
            mortgageParts: [

            ]
        }
    };

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
        const updatedMortgageInfo = { ...this.state.mortgageInfo, mortgageParts };
        this.setState({ mortgageInfo: updatedMortgageInfo });
        this.saveToStorage(updatedMortgageInfo);
    }

    onClearClicked = () => {
        this.setState(EMPTY_STATE);
    }

    onChangeMortgageInfoInput = (updatedMortgageInput) => {
        const mortgageInfo = Calculator.getMortgageInfo(updatedMortgageInput);
        // Turn string fields intp numbers
        Object.keys(mortgageInfo).forEach(key => {
            mortgageInfo[key] = Number(mortgageInfo[key]);
        });
        this.setState({ mortgageParts: [mortgageInfo]});
    }

}

export default Root;