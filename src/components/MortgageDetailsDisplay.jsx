import React, { PropTypes } from 'react';
import Flex from './Flex';
import { formatWholeDollarAmount, retainNDecimals } from '../utils';
import InfoLine from './InfoLine';
const { number, shape } = PropTypes;

class MortgageDetailsDisplay extends React.Component {

    static propTypes = {
        mortgageInfo: shape({
            loanAmount: number,
            monthlyPayment: number,
            totalPaymentToBank: number,
            costOfEachDollar: number
        }).isRequired
    }

    render() {
        const mortgageInfo = this.formatNumbersNicely(this.props.mortgageInfo);
        const { loanAmount, monthlyPayment, totalPaymentToBank, costOfEachDollar } = mortgageInfo;
        return (
            <Flex className='container MortgageDetailsDisplayContainer' column>
                <InfoLine title='Loan Amount' value={loanAmount} />
                <InfoLine title='Monthly payment' value={monthlyPayment} />
                <InfoLine title='Total Payment' value={totalPaymentToBank} />
                <InfoLine title='Cost Of Dollar' value={costOfEachDollar} />
            </Flex>
        );
    }

    formatNumbersNicely(mortgageInfo) {
        let { loanAmount, monthlyPayment, totalPaymentToBank, costOfEachDollar } = this.props.mortgageInfo;
        // Remove ugly decimals
        totalPaymentToBank = formatWholeDollarAmount(totalPaymentToBank);
        costOfEachDollar = retainNDecimals(costOfEachDollar, 2);
        monthlyPayment = formatWholeDollarAmount(monthlyPayment);
        loanAmount = formatWholeDollarAmount(loanAmount);

        return { loanAmount, monthlyPayment, totalPaymentToBank, costOfEachDollar };
    }

}

export default MortgageDetailsDisplay;

