/* eslint id-length: "off" */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import str from '../../localization';
import { removeAllDecimals } from '../../utils';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import './PaymentsGraph.scss';

const { string, number, arrayOf, shape } = PropTypes;

class PaymentsGraph extends React.Component {

    static propTypes = {
        className: string,
        paymentDetailsPerMonth: arrayOf(shape({
            principal: number,
            interest: number
        })).isRequired,
        maxXElements: number,
        width: number,
        height: number
    }

    static defaultProps = {
        maxXElements: 30,
        width: 800,
        height: 300
    }

    render() {
        const { className, paymentDetailsPerMonth, width, height } = this.props;

        const paymentDetailsPerMonthSliced = paymentDetailsPerMonth.slice(0, this.props.maxXElements);
        const numXValues = paymentDetailsPerMonthSliced.length;

        const data = {
            labels: _.range(numXValues),
            datasets: [
                {
                    label: str('principal'),
                    backgroundColor: '#36A2EB',
                    // borderColor: 'rgba(255,99,132,1)',
                    // borderWidth: 1,
                    // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    // hoverBorderColor: 'rgba(255,99,132,1)',
                    data: paymentDetailsPerMonthSliced.map(monthPaymentDetails => removeAllDecimals(monthPaymentDetails.principal))
                },
                {
                    label: str('interest'),
                    backgroundColor: '#FF6384',
                    // borderColor: 'rgba(255,99,132,1)',
                    // borderWidth: 1,
                    // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    // hoverBorderColor: 'rgba(255,99,132,1)',
                    data: paymentDetailsPerMonthSliced.map(monthPaymentDetails => removeAllDecimals(monthPaymentDetails.interest))
                }
            ]
        };

        const options = {
            scales: {
                yAxes: [{
                    stacked: true
                }],
                xAxes: [{
                    stacked: true
                }]
            }
        };
        return (
            <div className={cx('PaymentsGraphContainer', className)}>
                <h3 className='graphTitle'>{str('paymentsGraph')}</h3>
                <Bar data={data} options={options} width={width} height={height} />
            </div>
        );
    }

}

export default PaymentsGraph;