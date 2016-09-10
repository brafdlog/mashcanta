import React, { PropTypes } from 'react';
import { List, ListItem, ListItemContent, ListItemAction, IconButton } from 'react-mdl';
import cx from 'classnames';
import './MortgageInfoInputForm.scss';
import Flex from './Flex';
import InfoInputCell from './InfoInputCell';
import { formatWholeDollarAmount, formatPrecent } from '../utils';
import { KEREN_SHAVA, SHPITZER } from '../consts';
import str from '../localization';
import pureRender from 'pure-render-decorator';

const { func, shape, number, arrayOf, string, oneOf } = PropTypes;

@pureRender
class MortgageInfoInputForm extends React.Component {

    static propTypes = {
        handleChange: func,
        handleDelete: func,
        handleMoveUp: func,
        handleMoveDown: func,
        className: string,
        mortgageParts: arrayOf(shape({
            id: string,
            order: number,
            loanAmount: number,
            numYears: number,
            yearlyInterest: number,
            monthlyPayment: number,
            amortizationType: oneOf([KEREN_SHAVA, SHPITZER])
        }))
    }

    render() {
        const { mortgageParts, className } = this.props;
        return (
            <div className={cx('MortgageInfoInputFormContainer', className)}>
                <List>
                    <ListItem className='headingListItem listItem' key='heading'>
                        <ListItemContent>
                            <Flex>
                                <span className='columnHeading amortizationColumn'> {str('amortizationType')} </span>
                                <span className='columnHeading amountColumn'> {str('amount')} </span>
                                <span className='columnHeading numYearsColumn'> {str('years')} </span>
                                <span className='columnHeading interestColumn'> {str('interest')} </span>
                                <span className='columnHeading monthlyPaymentColumn'> {str('monthlyPayment')} </span>
                            </Flex>
                        </ListItemContent>
                    </ListItem>
                    {mortgageParts.map((part, partIndex) => {
                        return (
                            <ListItem className='listItem' key={part.id}>
                                <ListItemContent>
                                    <Flex align='center'>
                                        <select className='column amortizationColumn' value={part.amortizationType || SHPITZER} onChange={this.buildAmortizationChangeHandler(part)}>
                                            <option value={SHPITZER}>{str('shpitzer')}</option>
                                            <option value={KEREN_SHAVA}>{str('kerenShava')}</option>
                                        </select>
                                        <InfoInputCell className='column amountColumn' content={part.loanAmount} onContentChange={this.buildChangeHandler(part, 'loanAmount')} cellFormatter={formatWholeDollarAmount} />
                                        <InfoInputCell className='column numYearsColumn' content={part.numYears} onContentChange={this.buildChangeHandler(part, 'numYears')} />
                                        <InfoInputCell className='column interestColumn' content={part.yearlyInterest} onContentChange={this.buildChangeHandler(part, 'yearlyInterest')} cellFormatter={formatPrecent} />
                                        <InfoInputCell className='column monthlyPaymentColumn' content={part.monthlyPayment} onContentChange={this.buildChangeHandler(part, 'monthlyPayment')} cellFormatter={formatWholeDollarAmount}
                                            disabled marginLeft={25}
                                        />
                                    </Flex>
                                </ListItemContent>
                                <ListItemAction className='listItemAction'>
                                    <div className='iconsContainer'>
                                        <IconButton className='hidden-xs' name='keyboard_arrow_up' disabled={partIndex === 0} onClick={this.buildMoveHandler('up', part.id)} />
                                        <IconButton className='hidden-xs' name='keyboard_arrow_down' disabled={partIndex === mortgageParts.length - 1} onClick={this.buildMoveHandler('down', part.id)} />
                                        <IconButton name='delete' onClick={this.buildDeleteHandler(part.id)} />
                                    </div>
                                </ListItemAction>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }

    buildAmortizationChangeHandler = part => this.handleUpdateAmortization.bind(this, part.id);

    handleUpdateAmortization = (partId, event) => {
        const amortizationValueToUpdate = event.target.options[event.target.selectedIndex].value;
        return this.onChange(partId, 'amortizationType', amortizationValueToUpdate);
    }

    buildChangeHandler(part, propName) {
        return this.onChange.bind(this, part.id, propName);
    }

    buildDeleteHandler(partId) {
        return this.onDelete.bind(this, partId);
    }

    buildMoveHandler(direction, partId) {
        if (direction === 'up') {
            return this.props.handleMoveUp.bind(this, partId);
        }
        return this.props.handleMoveDown.bind(this, partId);
    }

    onChange(partId, propChanged, newValue) {
        const originalPart = this.props.mortgageParts.find(part => part.id === partId);
        const updatedPart = { ...originalPart, [propChanged]: newValue };
        this.props.handleChange(updatedPart);
    }

    onDelete(partId) {
        this.props.handleDelete(partId);
    }

}

export default MortgageInfoInputForm;