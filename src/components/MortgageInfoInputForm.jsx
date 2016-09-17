import React, { PropTypes } from 'react';
import { IconButton } from 'react-mdl';
import cx from 'classnames';
import './MortgageInfoInputForm.scss';
import InfoInputCell from './InfoInputCell';
import { formatWholeDollarAmount, formatPrecent } from '../utils';
import { KEREN_SHAVA, SHPITZER } from '../consts';
import str from '../localization';
import { observer } from 'mobx-react';

const { func, shape, number, arrayOf, string, oneOf } = PropTypes;

@observer
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
                <table>
                    <thead>
                        <tr>
                            <th className='columnHeading first'>{str('amortizationType')}</th>
                            <th className='columnHeading'>{str('amount')}</th>
                            <th className='columnHeading'>{str('years')}</th>
                            <th className='columnHeading'>{str('interest')}</th>
                            <th className='columnHeading'>{str('monthlyPayment')}</th>
                            <th className='columnHeading'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mortgageParts.map((part, partIndex) => {
                            return (
                                <tr className='listItem' key={part.id}>
                                    <td className='first'>
                                        <select className='column amortizationColumn' value={part.amortizationType || SHPITZER} onChange={this.buildAmortizationChangeHandler(part)}>
                                            <option value={SHPITZER}>{str('shpitzer')}</option>
                                            <option value={KEREN_SHAVA}>{str('kerenShava')}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <InfoInputCell className='column amountColumn' content={part.loanAmount} onContentChange={this.buildChangeHandler(part, 'loanAmount')} cellFormatter={formatWholeDollarAmount} />
                                    </td>
                                    <td>
                                        <InfoInputCell className='column numYearsColumn' content={part.numYears} onContentChange={this.buildChangeHandler(part, 'numYears')} />
                                    </td>
                                    <td>
                                        <InfoInputCell className='column interestColumn' content={part.yearlyInterest} onContentChange={this.buildChangeHandler(part, 'yearlyInterest')} cellFormatter={formatPrecent} />
                                    </td>
                                    <td>
                                        <InfoInputCell className='column monthlyPaymentColumn' content={part.monthlyPayment} onContentChange={this.buildChangeHandler(part, 'monthlyPayment')} cellFormatter={formatWholeDollarAmount}
                                            disabled marginLeft={25}
                                        />
                                    </td>
                                    <td>
                                        <div className='iconsContainer'>
                                            {/*
                                                <IconButton className='hidden-xs' name='keyboard_arrow_up' disabled={partIndex === 0} onClick={this.buildMoveHandler('up', part.id)} />
                                                <IconButton className='hidden-xs' name='keyboard_arrow_down' disabled={partIndex === mortgageParts.length - 1} onClick={this.buildMoveHandler('down', part.id)} />
                                            */}
                                            <IconButton className='deletePartIcon' name='delete' onClick={this.buildDeleteHandler(part.id)} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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