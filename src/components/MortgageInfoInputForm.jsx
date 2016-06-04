import React, { PropTypes } from 'react';
import { DataTable, TableHeader } from 'react-mdl';
import './MortgageInfoInputForm.scss';
import { addCommasToNumber } from '../utils';

const { func, shape, number, arrayOf } = PropTypes;

class MortgageInfoInputForm extends React.Component {

    static propTypes = {
        handleChange: func,
        mortgageParts: arrayOf(shape({
            order: number,
            loanAmount: number,
            numYears: number,
            yearlyInterest: number
        }))
    }

    render() {
        return (
            <div className='MortgageInfoInputFormContainer'>
                <DataTable shadow={2} rows={this.props.mortgageParts}>
                    <TableHeader numeric name='loanAmount' cellFormatter={this.formatLoanAmountCell} tooltip='The loan amount'>Loan amount</TableHeader>
                    <TableHeader numeric name='numYears' tooltip='Number of years'>Number of years</TableHeader>
                    <TableHeader numeric name='yearlyInterest' cellFormatter={this.formatInterestRateCell} tooltip='Yearly interest rate'>Interest rate</TableHeader>
                </DataTable>
            </div>
        );
    }

    formatInterestRateCell = (interestRate) => `${interestRate}%`

    formatLoanAmountCell = (loanAmount) => {
        const loanAmountWithCommas = addCommasToNumber(loanAmount * 1000);
        return `\$${loanAmountWithCommas}`;
    }

}

export default MortgageInfoInputForm;