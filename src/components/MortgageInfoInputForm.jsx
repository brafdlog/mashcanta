import React, { PropTypes } from 'react';
import { Textfield } from 'react-mdl';
import Flex from './Flex';

const { func } = PropTypes;
const NUMBER_VALIDATION_PATTERN = '-?[0-9]*(\.[0-9]+)?';
const VALIDATION_ERROR_MESSAGE = 'Input is not a number!';

class MortgageInfoInputForm extends React.Component {

    static propTypes = {
        handleChange: func
    }

    render() {
        const style = {
            width: '125px'
        };
        return (
            <Flex className='container MortgageInfoInputFormContainer' column>
                <Textfield style={style} onChange={this.onMonthlyPaymentChange} pattern={NUMBER_VALIDATION_PATTERN} error={VALIDATION_ERROR_MESSAGE}
                    label='Monthly payment' floatingLabel
                />
                <Textfield style={style} onChange={this.onLoanAmountChange} pattern={NUMBER_VALIDATION_PATTERN} error={VALIDATION_ERROR_MESSAGE}
                    label='Loan amount' floatingLabel
                />
                <Textfield style={style} onChange={this.onNumYearsChange} pattern={NUMBER_VALIDATION_PATTERN} error={VALIDATION_ERROR_MESSAGE}
                    label='No. of years' floatingLabel
                />
                <Textfield style={style} onChange={this.onInterestRateChange} pattern={NUMBER_VALIDATION_PATTERN} error={VALIDATION_ERROR_MESSAGE}
                    label='Interest rate' floatingLabel
                />
            </Flex>
        );
    }

    state = { }

    onChange = (propName, newValueStr) => {
        const newValue = Number(newValueStr);
        this.setState({ [propName]: newValue }, () => {
            this.props.handleChange({ ...this.state });
        });
    }

    onMonthlyPaymentChange = ({ target }) => {
        this.onChange('monthlyPayment', target.value);
    }

    onNumYearsChange = ({ target }) => {
        this.onChange('numYears', target.value);
    }

    onInterestRateChange = ({ target }) => {
        this.onChange('yearlyInterestPercent', target.value);
    }

    onLoanAmountChange = ({ target }) => {
        const loanAmount = target.value * 1000;
        this.onChange('loanAmount', loanAmount);
    }

}

export default MortgageInfoInputForm;