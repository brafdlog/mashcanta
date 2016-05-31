import React from 'react';
import Flex from './Flex.jsx';
import InfoLine from './InfoLine';
import * as Calculator from '../calculator';
import { Textfield } from 'react-mdl';

class Root extends React.Component {
    render() {
        return (
            <Flex className='container'>
                <Flex column>
                    <Textfield onChange={this.onMonthlyPaymentChange} pattern='-?[0-9]*(\.[0-9]+)?' error='Input is not a number!' label='Monthly payment' floatingLabel />
                    <Textfield onChange={this.onNumYearsChange} pattern='-?[0-9]*(\.[0-9]+)?' error='Input is not a number!' label='No. of years' floatingLabel />
                    <Textfield onChange={this.onInterestRateChange} pattern='-?[0-9]*(\.[0-9]+)?' error='Input is not a number!' label='Interest rate' floatingLabel />
                </Flex>
                {this.renderMortgageInfo(this.state.mortgageInfo)}
            </Flex>
        );
    }

    state = {};

    onMonthlyPaymentChange = ({ target }) => {
        this.setState({ monthlyPayment: target.value }, this.calculateMortgage);
    }

    onNumYearsChange = ({ target }) => {
        this.setState({ numYears: target.value }, this.calculateMortgage);
    }

    onInterestRateChange = ({ target }) => {
        this.setState({ yearlyInterestPercent: target.value }, this.calculateMortgage);
    }

    calculateMortgage() {
        const result = Calculator.getMortgageInfo(this.state);
        this.setState({ mortgageInfo: result });
    }

    renderMortgageInfo(mortgageInfo = {}) {
        return (
            <Flex column>
                <InfoLine title='Loan Amount' value={mortgageInfo.loanAmount} />
                <InfoLine title='Total Payment' value={mortgageInfo.totalPaymentToBank} />
                <InfoLine title='Cost Of Dollar' value={mortgageInfo.costOfEachDollar} />
            </Flex>
        );
    }
}

export default Root;