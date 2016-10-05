import React, { PropTypes } from 'react';
import cx from 'classnames';
import { formatWholeDollarAmount } from '../utils';
import str from '../localization';
// import _ from 'lodash';
import styles from './PaymentsTable.scss';
import { observer } from 'mobx-react';

const { string, number, arrayOf, shape } = PropTypes;

@observer
class PaymentsTable extends React.Component {

    static propTypes = {
        className: string,
        paymentDetailsPerMonth: arrayOf(shape({
            principal: number,
            interest: number,
            total: number
        })).isRequired
    }

    render() {
        const { className, paymentDetailsPerMonth } = this.props;

        return (
            <div className={cx(styles.PaymentsTableContainer, className)}>
                <h3 className={styles.graphTitle}>{str('paymentsTable')}</h3>
                <div className={styles.tableWrapper}>
                    <table className={cx('table', 'table-bordered', 'table-striped', 'table-condensed', styles.paymentsTable, styles['table-fixedheader'])}>
                        <thead>
                            <tr>
                                <th>{str('month')}</th>
                                <th>{str('interest')}</th>
                                <th>{str('principal')}</th>
                                <th>{str('total')}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {paymentDetailsPerMonth.map(({ principal, interest, total }, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{formatWholeDollarAmount(principal)}</td>
                                    <td>{formatWholeDollarAmount(interest)}</td>
                                    <td>{formatWholeDollarAmount(total)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default PaymentsTable;