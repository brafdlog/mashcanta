import React, { PropTypes } from 'react';
import Flex from './Flex';
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
        const mortgageInfo = this.props.mortgageInfo;
        return (
            <Flex className='container MortgageDetailsDisplayContainer' column>
                <InfoLine title='Loan Amount' value={Number(mortgageInfo.loanAmount)} />
                <InfoLine title='Monthly payment' value={Number(mortgageInfo.monthlyPayment)} />
                <InfoLine title='Total Payment' value={Number(mortgageInfo.totalPaymentToBank)} />
                <InfoLine title='Cost Of Dollar' value={Number(mortgageInfo.costOfEachDollar)} />
            </Flex>
        );
    }

}

export default MortgageDetailsDisplay;