import React, { PropTypes } from 'react';
import cx from 'classnames';
import rd3 from 'rd3';
import './PaymentsGraph.scss';
import str from '../../localization';
import { formatWholeDollarAmount } from '../../utils';
const BarChart = rd3.BarChart;

const { string, number } = PropTypes;

class PaymentsGraph extends React.Component {

    static propTypes = {
        className: string,
        loanAmount: number,
        loanCost: number
    }

    static defaultProps = {
    }

    render() {
        const { loanAmount, loanCost, className } = this.props;

        const barData = [
            {
                'name': 'Series A',
                'values': [
                    { 'x': 1, 'y':  61 },
                    { 'x': 2, 'y': 245 },
                    { 'x': 3, 'y': -17 },
                    { 'x': 4, 'y':  91 },
                    { 'x': 5, 'y': 245 },
                    { 'x': 6, 'y': -25 },
                    { 'x': 7, 'y':  91 },
                    { 'x': 8, 'y': 290 },
                    { 'x': 9, 'y': -25 },
                    { 'x': 10, 'y':  91 },
                    { 'x': 11, 'y': 290 },
                    { 'x': 12, 'y': -25 },
                    { 'x': 13, 'y':  91 },
                    { 'x': 14, 'y': 290 },
                    { 'x': 15, 'y': -25 },
                    { 'x': 16, 'y':  61 },
                    { 'x': 17, 'y': 245 },
                    { 'x': 18, 'y': -17 },
                    { 'x': 19, 'y':  91 },
                    { 'x': 20, 'y': 245 },
                    { 'x': 21, 'y': -25 },
                    { 'x': 22, 'y':  91 },
                    { 'x': 23, 'y': 290 },
                    { 'x': 24, 'y': -25 },
                    { 'x': 25, 'y':  91 },
                    { 'x': 26, 'y': 290 },
                    { 'x': 27, 'y': -25 },
                    { 'x': 28, 'y':  91 },
                    { 'x': 29, 'y': 290 },
                    { 'x': 30, 'y': -25 }
                ]
            },
            {
                'name': 'Series B',
                'values': [
                    { 'x': 1, 'y':  61 },
                    { 'x': 2, 'y': 245 },
                    { 'x': 3, 'y': -17 },
                    { 'x': 4, 'y':  61 },
                    { 'x': 5, 'y': 245 },
                    { 'x': 6, 'y': -17 },
                    { 'x': 7, 'y':  61 },
                    { 'x': 8, 'y': 245 },
                    { 'x': 9, 'y': -17 },
                    { 'x': 10, 'y':  61 },
                    { 'x': 11, 'y': 245 },
                    { 'x': 12, 'y': -17 },
                    { 'x': 13, 'y':  61 },
                    { 'x': 14, 'y': 245 },
                    { 'x': 15, 'y': -17 },
                    { 'x': 16, 'y':  61 },
                    { 'x': 17, 'y': 245 },
                    { 'x': 18, 'y': -17 },
                    { 'x': 19, 'y':  91 },
                    { 'x': 20, 'y': 245 },
                    { 'x': 21, 'y': -25 },
                    { 'x': 22, 'y':  91 },
                    { 'x': 23, 'y': 290 },
                    { 'x': 24, 'y': -25 },
                    { 'x': 25, 'y':  91 },
                    { 'x': 26, 'y': 290 },
                    { 'x': 27, 'y': -25 },
                    { 'x': 28, 'y':  91 },
                    { 'x': 29, 'y': 290 },
                    { 'x': 30, 'y': -25 }
                ]
            }
        ];
        return (
            <div className={cx('PaymentsGraphContainer', className)}>
                <BarChart
                    data={barData}
                    width={700}
                    height={300}
                    title={str('paymentsGraph') + ' - הנתונים עוד לא מחוברים לטבלה'}
                    xAxisLabel={str('year')}
                    yAxisLabel={str('monthlyPayment')}
                />
            </div>
        );
    }

}

export default PaymentsGraph;