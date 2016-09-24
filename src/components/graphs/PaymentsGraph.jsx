/* eslint id-length: "off" */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import str from '../../localization';
import { removeAllDecimals } from '../../utils';
import { Bar } from 'react-chartjs-2';
import Toggle from '../Toggle';
import _ from 'lodash';
import './PaymentsGraph.scss';
import { observer } from 'mobx-react';

const { string, number, arrayOf, shape, bool, func } = PropTypes;

@observer
class PaymentsGraph extends React.Component {

    static propTypes = {
        className: string,
        paymentDetailsPerMonth: arrayOf(shape({
            principal: number,
            interest: number
        })).isRequired,
        maxElements: number,
        width: number,
        height: number,
        yearlyGraph: bool,
        handleUpdateGranularity: func
    }

    static defaultProps = {
        maxElements: 80,
        width: 800,
        height: 300,
        yearlyGraph: true
    }

    render() {
        const { className, paymentDetailsPerMonth, width, height, yearlyGraph } = this.props;

        const paymentDetailsPerYear = this.batchToYears(paymentDetailsPerMonth);

        const paymentDetailsPerPeriod = yearlyGraph ? paymentDetailsPerYear : paymentDetailsPerMonth;
        const paymentDetailsPerPeriodSliced = paymentDetailsPerPeriod.slice(0, this.props.maxElements);
        const numXValues = paymentDetailsPerPeriodSliced.length;

        const data = {
            labels: _.range(1, numXValues + 1),
            datasets: [
                {
                    label: str('principal'),
                    backgroundColor: '#36A2EB',
                    // borderColor: 'rgba(255,99,132,1)',
                    // borderWidth: 1,
                    // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    // hoverBorderColor: 'rgba(255,99,132,1)',
                    data: paymentDetailsPerPeriodSliced.map(periodPaymentDetails => removeAllDecimals(periodPaymentDetails.principal))
                }
            ]
        };

        if (this.state.showInterest) {
            data.datasets.push({
                label: str('interest'),
                backgroundColor: '#FF6384',
                // borderColor: 'rgba(255,99,132,1)',
                // borderWidth: 1,
                // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                // hoverBorderColor: 'rgba(255,99,132,1)',
                data: paymentDetailsPerPeriodSliced.map(periodPaymentDetails => removeAllDecimals(periodPaymentDetails.interest))
            });
        }

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
                <div className='granularitySelectionWrapper'>
                    <label><input type='radio' value='monthly' checked={!this.props.yearlyGraph} onChange={this.handleChangeGranularity} /> {str('monthly')} </label>
                    <label><input type='radio' value='yearly' checked={this.props.yearlyGraph} onChange={this.handleChangeGranularity} /> {str('yearly')} </label>
                </div>
                <Toggle on={this.state.showInterest} onChange={this.handleChangeShowInterest} title={str('showInterest')} />
                <Bar data={data} options={options} width={width} height={height} />
            </div>
        );
    }

    state = {
        showInterest: false
    }

    handleChangeShowInterest = showInterest => {
        this.setState({
            showInterest
        }, () => { this.forceUpdate() });
    }

    handleChangeGranularity = ({ target }) => {
        this.props.handleUpdateGranularity(target.value);
    }

    batchToYears(paymentDetailsPerMonth) {
        let currentYearPaymentDetails;
        let currentYear = -1;
        const paymentDetailsPerYear = [];

        paymentDetailsPerMonth.forEach((paymentDetails, monthIndex) => {
            if (monthIndex % 12 === 0) {
                if (monthIndex > 0) {
                    paymentDetailsPerYear[currentYear] = currentYearPaymentDetails;
                }

                currentYear++;
                currentYearPaymentDetails = {
                    interest: 0,
                    principal: 0
                };
            }
            currentYearPaymentDetails.interest += paymentDetails.interest;
            currentYearPaymentDetails.principal += paymentDetails.principal;
        });

        paymentDetailsPerYear[currentYear] = currentYearPaymentDetails;

        return paymentDetailsPerYear;
    }

}

export default PaymentsGraph;