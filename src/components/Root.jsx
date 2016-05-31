import React from 'react';
import Flex from './Flex.jsx';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import * as Calculator from '../calculator';

class Root extends React.Component {
    render() {
        return (
            <Flex className='container'>
                <MortgageInfoInputForm handleChange={this.onChangeMortgageInfoInput} />
                <MortgageDetailsDisplay mortgageInfo={this.state.mortgageInfo} />
            </Flex>
        );
    }

    state = {
        mortgageInfo: {
            loanAmount: 0,
            monthlyPayment: 0,
            totalPaymentToBank: 0,
            costOfEachDollar: 0
        }
    };

    onChangeMortgageInfoInput = (updatedMortgageInput) => {
        const mortgageInfo = Calculator.getMortgageInfo(updatedMortgageInput);
        this.setState({ mortgageInfo });
    }


}

export default Root;