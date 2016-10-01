import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './MortgageInfoInputRow.scss';
import { formatWholeDollarAmount, formatPrecent, formattedStringToNumber } from '../utils';
import { KEREN_SHAVA, SHPITZER, BULLET, STORAGE_PATH_PREFIX } from '../consts';
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
            const inputEventHandlerProps = {
                onBlur: this.handleInputBlur,
                onChange: this.handleInputChange,
                onKeyPress: this.handleKeyPress
            };
            return (
                <div className={cx(styles.MortgageInfoInputRow, className)}>
                    <span className={cx(styles.partIndex, 'hidden-xs')}>{partIndexTxt}</span>
                    {showMaslul ? <Select className={cx(styles.inputField, styles.selectBox)} options={HATZMADA_TYPE_OPTIONS} value={amortizationType} searchable={false} clearable={false} /> : null}
                    <Select className={cx(styles.inputField, styles.selectBox)} options={AMORTIZATION_TYPE_OPTIONS} value={amortizationType} searchable={false} clearable={false}
                        onChange={this.handleChangeAmortizationType}
                    />
                    <input type='text' className={cx(styles.inputField)} value={formatWholeDollarAmount(this.state.loanAmount)} {...inputEventHandlerProps} data-attribute-name='loanAmount' />
                    <input type='text' className={cx(styles.inputField, styles.smallField)} value={this.state.numYears} {...inputEventHandlerProps} data-attribute-name='numYears' />
                    <input type='text' className={cx(styles.inputField, styles.smallField)} value={formatPrecent(this.state.yearlyInterest)} {...inputEventHandlerProps} data-attribute-name='yearlyInterest' />
                    <input type='text' className={cx(styles.inputField, styles.monthlyPayment, 'hidden-xs')} value={formatWholeDollarAmount(mortgagePart.monthlyPayment)} readOnly />
                    <img className={styles.removeIcon} src={`${STORAGE_PATH_PREFIX}icons/delete.svg`} alt={str('delete')} onClick={this.handleDeletePart} />
                </div>
            );
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur();
        }
    }

    handleInputChange = ({ target }) => {
        const attributeName = target.getAttribute('data-attribute-name');
        const newValue = formattedStringToNumber(target.value);
        this.setState({
            [attributeName]: newValue
        });
    }

    handleInputBlur = ({ target }) => {
        const { mortgagePart, onChange } = this.props;
        const attributeName = target.getAttribute('data-attribute-name');
        const newValue = formattedStringToNumber(target.value);
        if (_.isNumber(newValue)) {
            onChange(mortgagePart.id, attributeName, newValue);
        }
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