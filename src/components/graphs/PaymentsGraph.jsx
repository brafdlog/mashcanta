/* eslint id-length: "off" */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import rd3 from 'rd3';
import './PaymentsGraph.scss';
import str from '../../localization';
import { removeAllDecimals } from '../../utils';
const BarChart = rd3.BarChart;

const { string, number, arrayOf, shape } = PropTypes;

class PaymentsGraph extends React.Component {

    static propTypes = {
        className: string,
        paymentDetailsPerMonth: arrayOf(shape({
            principal: number,
            interest: number
        })).isRequired,
        maxXElements: number
    }

    static defaultProps = {
        maxXElements: 30
    }

    render() {
        const { className, paymentDetailsPerMonth } = this.props;

        const paymentDetailsPerMonthSliced = paymentDetailsPerMonth.slice(0, this.props.maxXElements);
        const barData = [
            {
                'name': str('principal'),
                'values': paymentDetailsPerMonthSliced.map((monthPaymentDetails, monthIndex) => {
                    return {
                        x: monthIndex,
                        y: removeAllDecimals(monthPaymentDetails.principal)
                    };
                })
            },
            {
                'name': str('interest'),
                'values': paymentDetailsPerMonthSliced.map((monthPaymentDetails, monthIndex) => {
                    return {
                        x: monthIndex,
                        y: removeAllDecimals(monthPaymentDetails.interest)
                    };
                })
            }
        ];
        return (
            <div className={cx('PaymentsGraphContainer', className)}>
                <BarChart
                    data={barData}
                    width={700}
                    height={300}
                    title={str('paymentsGraph')}
                    xAxisLabel={str('year')}
                    yAxisLabel={str('monthlyPayment')}
                />
            </div>
        );
    }

}

export default PaymentsGraph;