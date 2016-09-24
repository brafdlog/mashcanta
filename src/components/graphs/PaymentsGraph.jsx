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
        maxElements: 40,
        width: 800,
        height: 300,
        yearlyGraph: true
    }

    render() {
        const { className, paymentDetailsPerMonth, width, height, yearlyGraph, maxElements } = this.props;

        const paymentDetailsPerYear = this.batchToYears(paymentDetailsPerMonth);

        const paymentDetailsPerPeriod = yearlyGraph ? paymentDetailsPerYear : paymentDetailsPerMonth;
        const startIndex = this.state.startIndex;
        const endIndex = Math.min(startIndex + maxElements, paymentDetailsPerPeriod.length);
        const paymentDetailsPerPeriodSliced = paymentDetailsPerPeriod.slice(startIndex, endIndex);
        const numXValues = paymentDetailsPerPeriodSliced.length;

        let datasets;

        if (this.state.showInterestSeparately) {
            datasets = [
                {
                    label: str('principal'),
                    backgroundColor: '#36A2EB',
                    // borderColor: 'rgba(255,99,132,1)',
                    // borderWidth: 1,
                    // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    // hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.buildDataForDataset(paymentDetailsPerPeriodSliced, 'principal')
                },
                {
                    label: str('interest'),
                    backgroundColor: '#FF6384',
                    // borderColor: 'rgba(255,99,132,1)',
                    // borderWidth: 1,
                    // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    // hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.buildDataForDataset(paymentDetailsPerPeriodSliced, 'interest')
                }
            ];
        } else {
            datasets = [
                {
                    label: yearlyGraph ? str('yearlyPayment') : str('monthlyPayment'),
                    backgroundColor: '#36A2EB',
                    // borderColor: 'rgba(255,99,132,1)',
                    // borderWidth: 1,
                    // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    // hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.buildDataForDataset(paymentDetailsPerPeriodSliced, 'total')
                }
            ];
        }

        const data = {
            labels: _.range(startIndex + 1, startIndex + numXValues + 1),
            datasets
        };

        const options = {
            scales: {
                yAxes: [{
                    stacked: true
                }],
                xAxes: [{
                    stacked: true
                }]
            },
            // Animation is disabled because when using the start index slider, the animation is too slow
            animation: false
        };
        return (
            <div className={cx('PaymentsGraphContainer', className)}>
                <h3 className='graphTitle'>{str('paymentsGraph')}</h3>
                <div className='granularitySelectionWrapper'>
                    <label><input type='radio' value='monthly' checked={!this.props.yearlyGraph} onChange={this.handleChangeGranularity} /> {str('monthly')} </label>
                    <label><input type='radio' value='yearly' checked={this.props.yearlyGraph} onChange={this.handleChangeGranularity} /> {str('yearly')} </label>
                </div>
                <Toggle on={this.state.showInterestSeparately} onChange={this.handleChangeShowInterestSeparately} title={str('showInterestSeparately')} />
                {paymentDetailsPerPeriod.length - maxElements > 1 ?
                    <span className='startIndexSliderContainer'>
                        <span className='title'>{str('changeGraphPeriod')}</span>
                        <input className='startIndexSlider' type='range' min={0} max={paymentDetailsPerPeriod.length - maxElements} step={1}
                            value={this.state.startIndex} onChange={this.handleStartIndexChange}
                        />
                    </span> : null
                }
                <Bar data={data} options={options} width={width} height={height} />
            </div>
        );
    }

    state = {
        showInterestSeparately: false,
        startIndex: 0
    }

    handleStartIndexChange = ({ target }) => {
        const newStartIndex = target.value;
        this.setState({
            startIndex: Number(newStartIndex)
        });
    }

    buildDataForDataset = (paymentDetailsPerPeriodSliced, fieldName) => {
        return paymentDetailsPerPeriodSliced.map(periodPaymentDetails => removeAllDecimals(periodPaymentDetails[fieldName]));
    }

    handleChangeShowInterestSeparately = showInterestSeparately => {
        this.setState({
            showInterestSeparately
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
                    principal: 0,
                    total: 0
                };
            }
            currentYearPaymentDetails.interest += paymentDetails.interest;
            currentYearPaymentDetails.principal += paymentDetails.principal;
            currentYearPaymentDetails.total += paymentDetails.total;
        });

        paymentDetailsPerYear[currentYear] = currentYearPaymentDetails;

        return paymentDetailsPerYear;
    }

}

export default PaymentsGraph;