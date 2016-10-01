import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './MortgageInfoInputRow.scss';
import { formatWholeDollarAmount, formatPrecent } from '../utils';
import { KEREN_SHAVA, SHPITZER, BULLET } from '../consts';
import str from '../localization';
import { observer } from 'mobx-react';
import Select from 'react-select';

const { shape, number, string, oneOf, func } = PropTypes;

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
            amortizationType: oneOf([KEREN_SHAVA, SHPITZER, BULLET]),
            partIndex: number
        }),
        onChange: func
    }

    constructor(props) {
        super(props);
        this.state = {
            ...props.mortgagePart
        };
    }

    render() {
        const { mortgagePart, className } = this.props;
        const { amortizationType, partIndex } = mortgagePart;
        const partIndexTxt = `${partIndex + 1}.`;
        return (
            <div className={cx(styles.MortgageInfoInputRow, className)}>
                <span className={styles.partIndex}>{partIndexTxt}</span>
                <Select className={cx(styles.inputField, styles.selectBox)} options={HATZMADA_TYPE_OPTIONS} value={amortizationType} searchable={false} clearable={false} />
                <Select className={cx(styles.inputField, styles.selectBox)} options={AMORTIZATION_TYPE_OPTIONS} value={amortizationType} searchable={false} clearable={false} />
                <input type='text' className={cx(styles.inputField)} value={formatWholeDollarAmount(this.state.loanAmount)} />
                <input type='text' className={cx(styles.inputField)} value={this.state.numYears} />
                <input type='text' className={cx(styles.inputField)} value={formatPrecent(this.state.yearlyInterest)} />
                <input type='text' className={cx(styles.inputField, styles.monthlyPayment)} value={formatWholeDollarAmount(this.state.monthlyPayment)} readOnly />
                <span className={cx('glyphicon', 'glyphicon-remove', styles.removeIcon)} aria-hidden='true'></span>
            </div>
        );
    }

}

export default MortgageInfoInputRow;