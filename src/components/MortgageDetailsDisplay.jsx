import React, { PropTypes } from 'react';
import Flex from './Flex';
import { formatWholeDollarAmount, retainNDecimals } from '../utils';
import InfoLine from './InfoLine';
import './MortgageDetailsDisplay.scss';
import str from '../localization';
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
            <Flex className='container MortgageDetailsDisplay' column>
                <InfoLine title={str('loanAmount')} value={loanAmount} />
                <InfoLine title={str('monthlyPayment')} value={monthlyPayment} />
                <InfoLine title={str('totalPayment')} value={totalPaymentToBank} />
                <InfoLine title={str('costOfDollar')} value={costOfEachDollar} />
            </Flex>
        );
    }

    formatNumbersNicely(mortgageInfo) {
        let { loanAmount, monthlyPayment, totalPaymentToBank, costOfEachDollar } = this.props.mortgageInfo;
        // Remove ugly decimals
        totalPaymentToBank = formatWholeDollarAmount(totalPaymentToBank);
        costOfEachDollar = retainNDecimals(costOfEachDollar, 3);
        monthlyPayment = formatWholeDollarAmount(monthlyPayment);
        loanAmount = formatWholeDollarAmount(loanAmount);

        return { loanAmount, monthlyPayment, totalPaymentToBank, costOfEachDollar };
    }

}

export default MortgageDetailsDisplay;

