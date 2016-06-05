import React, { PropTypes } from 'react';
import { Textfield, Button } from 'react-mdl';
import Flex from './Flex';
import './AddNewPart.scss';

const { func } = PropTypes;
const NUMBER_VALIDATION_PATTERN = '-?[0-9]*(\.[0-9]+)?';
const VALIDATION_ERROR_MESSAGE = 'Input is not a number!';

class AddNewPart extends React.Component {

    static propTypes = {
        handleAddPart: func.isRequired,
        handleClearClicked: func
    }

    render() {
        const style = {
            width: '100px',
            marginRight: '10px'
        };
        return (
            <div className='AddNewPart'>
                <Flex className='container MortgageInfoInputFormContainer' onKeyPress={this.handleKeyPress}>
                    <Textfield key={this.state.timestamp + 1} style={style} pattern={NUMBER_VALIDATION_PATTERN} error={VALIDATION_ERROR_MESSAGE}
                        label='Loan amount' onChange={this.onLoanAmountChange} floatingLabel
                    />
                    <Textfield key={this.state.timestamp + 2} style={style} pattern={NUMBER_VALIDATION_PATTERN} error={VALIDATION_ERROR_MESSAGE}
                        label='No. of years' onChange={this.onNumYearsChange} floatingLabel
                    />
                    <Textfield key={this.state.timestamp + 3} style={style} pattern={NUMBER_VALIDATION_PATTERN} error={VALIDATION_ERROR_MESSAGE}
                        label='Interest rate' onChange={this.onInterestRateChange} floatingLabel
                    />
                </Flex>
                <Button raised colored onClick={this.onAddClicked}>Add</Button>
                <Button className='clearButton' raised colored onClick={this.props.handleClearClicked}>Clear all</Button>
            </div>
        );
    }

    state = {
        timestamp: Date.now()
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            this.onAddClicked();
        }
    }

    onAddClicked = () => {
        this.props.handleAddPart(this.state);
        this.clearForm();
    }

    clearForm = () => {
        this.setState({ timestamp: Date.now() });
    }

    onChange = (propName, newValueStr) => {
        const newValue = Number(newValueStr);
        this.setState({ [propName]: newValue });
    }

    onMonthlyPaymentChange = ({ target }) => {
        this.onChange('monthlyPayment', target.value);
    }

    onNumYearsChange = ({ target }) => {
        this.onChange('numYears', target.value);
    }

    onInterestRateChange = ({ target }) => {
        this.onChange('yearlyInterest', target.value);
    }

    onLoanAmountChange = ({ target }) => {
        this.onChange('loanAmount', target.value * 1000);
    }

}

export default AddNewPart;