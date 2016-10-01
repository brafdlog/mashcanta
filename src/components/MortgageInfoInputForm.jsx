import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './MortgageInfoInputForm.scss';
import MortgageInfoInputRow from './MortgageInfoInputRow';
import { formattedStringToNumber } from '../utils';
import { KEREN_SHAVA, SHPITZER, BULLET } from '../consts';
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
        handleAddPart: func,
        className: string,
        mortgageParts: arrayOf(shape({
            id: string,
            order: number,
            loanAmount: number,
            numYears: number,
            yearlyInterest: number,
            monthlyPayment: number,
            amortizationType: oneOf([KEREN_SHAVA, SHPITZER, BULLET])
        }))
    }

    render() {
        const { mortgageParts, className, handleAddPart } = this.props;

        return (
            <div className={cx(styles.MortgageInfoInputFormContainer, className)}>
                <MortgageInfoInputRow key='headerRow' isHeaderRow />
                {mortgageParts.map((mortgagePart, partIndex) => <MortgageInfoInputRow key={mortgagePart.id} mortgagePart={mortgagePart} onChange={this.onChange} onDelete={this.props.handleDelete} partIndex={partIndex} />)}
                <img className={cx(styles.button)} src='icons/delete.svg' alt={str('add')} onClick={handleAddPart} />
            </div>
        );
    }

    state = {}

    onChange = (partId, changedProp, newValue) => {
        // For numeric fields make sure to update number and not string
        const valueToUpdate = changedProp === 'amortizationType' ? newValue : formattedStringToNumber(newValue);

        const originalPart = this.props.mortgageParts.find(part => part.id === partId);
        const updatedPart = { ...originalPart, [changedProp]: valueToUpdate };
        this.props.handleChange(updatedPart);
    }

}

export default MortgageInfoInputForm;