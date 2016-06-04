import React, { PropTypes } from 'react';
import Flex from './Flex';
import InfoLine from './InfoLine';
import { addCommasToNumber } from '../utils';
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
        totalPaymentToBank = this.removeAllDecimals(totalPaymentToBank);
        costOfEachDollar = this.retainNDecimals(costOfEachDollar, 2);
        monthlyPayment = this.removeAllDecimals(monthlyPayment);
        loanAmount = this.removeAllDecimals(loanAmount);

        totalPaymentToBank = addCommasToNumber(totalPaymentToBank);
        monthlyPayment = addCommasToNumber(monthlyPayment);
        loanAmount = addCommasToNumber(loanAmount);

        return { loanAmount, monthlyPayment, totalPaymentToBank, costOfEachDollar };
    }

    isWholeNumber(someNumber) {
        return someNumber % 1 === 0;
    }

    removeAllDecimals(someNumber) {
        if (!someNumber) {
            return 0;
        }
        return Math.floor(someNumber);
    }

    retainNDecimals(someNumber, numDecimalsToRetain) {
        if (!someNumber) {
            return 0;
        }
        if (this.isWholeNumber(someNumber)) {
            return someNumber;
        }
        const numberWithoutDecimals = Number(someNumber.toFixed(numDecimalsToRetain));
        return numberWithoutDecimals;
    }

}

export default MortgageDetailsDisplay;

