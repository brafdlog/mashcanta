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
            averageMonthlyPayment: number,
            totalPaymentToBank: number,
            costOfEachDollar: number
        }).isRequired
    }

    render() {
        const mortgageInfo = this.formatNumbersNicely(this.props.mortgageInfo);
        const { loanAmount, averageMonthlyPayment, totalPaymentToBank, costOfEachDollar } = mortgageInfo;
        return (
            <div className={cx(styles.MortgageDetailsDisplay, 'row')}>
                <InfoLine className={styles.infoLineColumn} title={str('loanAmount')} value={loanAmount} />
                <InfoLine className={styles.infoLineColumn} title={str('averageMonthlyPayment')} value={averageMonthlyPayment} />
                <InfoLine className={styles.infoLineColumn} title={str('totalPayment')} value={totalPaymentToBank} />
                <InfoLine className={styles.infoLineColumn} title={str('costOfDollar')} value={costOfEachDollar} />
            </div>
        );
    }

    formatNumbersNicely(mortgageInfo) {
        let { loanAmount, averageMonthlyPayment, totalPaymentToBank, costOfEachDollar } = this.props.mortgageInfo;
        // Remove ugly decimals
        totalPaymentToBank = formatWholeDollarAmount(totalPaymentToBank);
        costOfEachDollar = retainNDecimals(costOfEachDollar, 3);
        averageMonthlyPayment = formatWholeDollarAmount(averageMonthlyPayment);
        loanAmount = formatWholeDollarAmount(loanAmount);

        return { loanAmount, averageMonthlyPayment, totalPaymentToBank, costOfEachDollar };
    }

}

export default MortgageDetailsDisplay;

