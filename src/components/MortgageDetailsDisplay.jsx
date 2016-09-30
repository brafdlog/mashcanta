import React, { PropTypes } from 'react';
import { formatWholeDollarAmount, retainNDecimals } from '../utils';
import InfoLine from './InfoLine';
import styles from './MortgageDetailsDisplay.scss';
import str from '../localization';
import { observer } from 'mobx-react';
import cx from 'classnames';

const { number, shape } = PropTypes;

@observer
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
        const mortgageInfo = this.formatNumbersNicely(this.props.mortgageInfo);
        const { loanAmount, monthlyPayment, totalPaymentToBank, costOfEachDollar } = mortgageInfo;
        return (
            <div className={cx(styles.MortgageDetailsDisplay, 'row')}>
                <div className={cx('col-md-3', styles.infoLineColumn)}>
                    <InfoLine title={str('loanAmount')} value={loanAmount} highlighted />
                </div>
                <div className={cx('col-md-3', styles.infoLineColumn)}>
                    <InfoLine title={str('monthlyPayment')} value={monthlyPayment} />
                </div>
                <div className={cx('col-md-3', styles.infoLineColumn)}>
                    <InfoLine title={str('totalPayment')} value={totalPaymentToBank} />
                </div>
                <div className={cx('col-md-3', styles.infoLineColumn)}>
                    <InfoLine title={str('costOfDollar')} value={costOfEachDollar} />
                </div>
            </div>
        );
    }

    formatNumbersNicely(mortgageInfo) {
        let { loanAmount, monthlyPayment, totalPaymentToBank, costOfEachDollar } = this.props.mortgageInfo;
        // Remove ugly decimals
        totalPaymentToBank = formatWholeDollarAmount(totalPaymentToBank);
        costOfEachDollar = retainNDecimals(costOfEachDollar, 3);
        monthlyPayment = formatWholeDollarAmount(monthlyPayment);
        loanAmount = formatWholeDollarAmount(loanAmount);

        return { loanAmount, monthlyPayment, totalPaymentToBank, costOfEachDollar };
    }

}

export default MortgageDetailsDisplay;

