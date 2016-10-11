import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './MortgageInfoInputRow.scss';
import { KEREN_SHAVA, SHPITZER, BULLET, CSS, WHOLE_DOLLAR_AMOUT, PERCENT } from '../consts';
import { isWholeNumber } from '../utils';
import Icon from './Icon';
import Input from './Input';
import str from '../localization';
import { observer } from 'mobx-react';
import Select from 'react-select';
import _ from 'lodash';

const { shape, number, string, oneOf, func, bool } = PropTypes;


const AMORTIZATION_TYPE_OPTIONS = [
    { value: SHPITZER, label: str('shpitzer') },
    { value: KEREN_SHAVA, label: str('kerenShava') },
    { value: BULLET, label: str('bullet') }
];

const HATZMADA_TYPE_OPTIONS = [
    // { value: SHPITZER, label: str('shpitzer') },
    // { value: KEREN_SHAVA, label: str('kerenShava') },
    { value: 'madad', label: str('madad') }
];

@observer
class MortgageInfoInputRow extends React.Component {

    static propTypes = {
        className: string,
        mortgagePart: shape({
            id: string,
            order: number,
            loanAmount: number,
            numYears: number,
            yearlyInterest: number,
            monthlyPayment: number,
            amortizationType: oneOf([KEREN_SHAVA, SHPITZER, BULLET])
        }),
        partIndex: number,
        onChange: func,
        onDelete: func,
        isHeaderRow: bool
    }

    static defaultProps = {
        isHeaderRow: false
    }

    constructor(props) {
        super(props);
        this.handleChangeAmortizationType = this.handleDropdownSelection.bind(this, 'amortizationType');
        this.state = {
            ...props.mortgagePart
        };
    }

    render() {
        const { mortgagePart, className, isHeaderRow, partIndex } = this.props;
        const showMaslul = false;
        if (isHeaderRow) {
            return (
                <div className={cx(styles.MortgageInfoInputRow, className, styles.headerRow)}>
                    <span className={cx(styles.partIndex, 'hidden-xs')}></span>
                    {showMaslul ? <p className={cx(styles.inputField)} > {str('maslul')} </p> : null}
                    <p className={cx(styles.inputField)} > {str('amortizationType')} </p>
                    <p className={cx(styles.inputField)} > {str('amount')} </p>
                    <p className={cx(styles.inputField, styles.smallField)} > {str('years')} </p>
                    <p className={cx(styles.inputField, styles.smallField)} > {str('interest')} </p>
                    <p className={cx(styles.inputField, 'hidden-xs')} > {str('monthlyPayment')} </p>
                    <span className={styles.removeIcon} />
                </div>
            );
        } else {
            const { amortizationType } = mortgagePart;
            const partIndexTxt = `${partIndex + 1}.`;
            return (
                <div className={cx(styles.MortgageInfoInputRow, className)}>
                    <span className={cx(styles.partIndex, 'hidden-xs')}>{partIndexTxt}</span>
                    {showMaslul ? <Select className={cx(styles.inputField, styles.selectBox)} options={HATZMADA_TYPE_OPTIONS} value={amortizationType} searchable={false} clearable={false} /> : null}
                    <Select className={cx(styles.inputField, styles.selectBox)} options={AMORTIZATION_TYPE_OPTIONS} value={amortizationType} searchable={false} clearable={false}
                        onChange={this.handleChangeAmortizationType}
                    />
                    <Input className={cx(styles.inputField)} value={mortgagePart.loanAmount} displayFormattingType={WHOLE_DOLLAR_AMOUT} onBlur={this.handleInputBlur} domAttributes={{ 'data-attribute-name': 'loanAmount' }}
                        validationFunctions={[this.wholeNumberValidation, this.nonNegativeNumberValidation]}
                    />
                    <Input type='text' className={cx(styles.inputField, styles.smallField)} value={mortgagePart.numYears} onBlur={this.handleInputBlur} domAttributes={{ 'data-attribute-name': 'numYears' }}
                        validationFunctions={[this.wholeNumberValidation, this.rangeFromZeroToFifteeValidation]}
                    />
                    <Input type='text' className={cx(styles.inputField, styles.smallField)} displayFormattingType={PERCENT} value={mortgagePart.yearlyInterest} onBlur={this.handleInputBlur}
                        validationFunctions={[this.numberValidation, this.rangeFromZeroToFifteeValidation]} domAttributes={{ 'data-attribute-name': 'yearlyInterest' }}
                    />
                    <Input type='text' className={cx(styles.inputField, styles.monthlyPayment, 'hidden-xs')} displayFormattingType={WHOLE_DOLLAR_AMOUT} value={mortgagePart.monthlyPayment} readOnly />
                    <Icon id='delete' className={styles.removeIcon} onClick={this.handleDeletePart} height={20} color={CSS.fontColor}
                        hoverColor={CSS.red}
                    />
                </div>
            );
        }
    }

    wholeNumberValidation = value => {
        if (!this.isNumber(value) || !isWholeNumber(Number(value))) {
            return str('validationErrors.wholeNumber');
        }
        return null;
    }

    numberValidation = value => {
        return this.isNumber(value) ? null : str('validationErrors.number');
    }

    isNumber = value => {
        const endsWithPeriod = value.endsWith && value.endsWith('.');
        return !endsWithPeriod && _.isFinite(Number(value));
    }

    nonNegativeNumberValidation = value => {
        return this.rangeValidation({ min: 0 }, Number(value));
    }

    rangeFromZeroToFifteeValidation = value => {
        return this.rangeValidation({ min: 0, max: 50 }, Number(value));
    }

    rangeValidation = ({ min, max }, value) => {
        const minDefined = !_.isUndefined(min);
        const maxDefined = !_.isUndefined(max);
        const isSmallerThanMin = value < min;
        const isLargetThanMax = value > max;

        if (!this.isNumber(value)) {
            return str('validationErrors.number');
        }

        if (minDefined && maxDefined) {
            return (isSmallerThanMin || isLargetThanMax) ? str('validationErrors.numberRange')(min, max) : null;
        }
        if (minDefined && isSmallerThanMin) {
            return str('validationErrors.greaterThan')(min);
        }
        if (maxDefined && isLargetThanMax) {
            return str('validationErrors.lessThan')(max);
        }
        return null;
    }

    handleInputBlur = (value, eventTarget) => {
        const { mortgagePart, onChange } = this.props;
        const attributeName = eventTarget.getAttribute('data-attribute-name');
        onChange(mortgagePart.id, attributeName, value);
    }

    handleDropdownSelection = (attributeName, { value }) => {
        const { mortgagePart, onChange } = this.props;
        this.setState({
            [attributeName]: value
        });
        onChange(mortgagePart.id, attributeName, value);
    }

    handleDeletePart = () => {
        const { mortgagePart, onDelete } = this.props;
        onDelete(mortgagePart.id);
    }

}

export default MortgageInfoInputRow;