/* eslint id-length: "off" */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import str from '../../localization';
import { removeAllDecimals, formatWholeDollarAmount } from '../../utils';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import './PaymentsGraph.scss';
import { observer } from 'mobx-react';

const { string, number, arrayOf, shape } = PropTypes;

@observer
class PaymentsGraph extends React.Component {

    static propTypes = {
        className: string,
        paymentDetailsPerMonth: arrayOf(shape({
            principal: number,
            interest: number,
            total: number
        })).isRequired,
        paymentDetailsPerYear: arrayOf(shape({
            principal: number,
            interest: number,
            total: number
        })).isRequired,
        maxElements: number,
        width: number,
        height: number
    }

    static defaultProps = {
        maxElements: 40,
        width: 800,
        height: 300
    }

    render() {
        const { className, paymentDetailsPerMonth, width, height, maxElements, paymentDetailsPerYear } = this.props;
        const { yearlyGraph } = this.state;
        const monthlyGraph = !yearlyGraph;
        const maxElementsToDisplay = monthlyGraph ? 12 : maxElements;
        const paymentDetailsPerPeriod = yearlyGraph ? paymentDetailsPerYear : paymentDetailsPerMonth;
        const startIndex = this.state.startIndex;
        const endIndex = Math.min(startIndex + maxElementsToDisplay, paymentDetailsPerPeriod.length);
        const paymentDetailsPerPeriodSliced = paymentDetailsPerPeriod.slice(startIndex, endIndex);
        const numXValues = paymentDetailsPerPeriodSliced.length;

        const redraw = this.redraw;
        if (redraw) {
            this.redraw = false;
        }

        const paymentPeriodLabel = yearlyGraph ? str('averageMonthlyPayment') : str('monthlyPayment');

        const data = {
            labels: _.range(1, numXValues + 1),
            datasets: [
                {
                    label: str('total'),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    data: this.buildDataForDataset(paymentDetailsPerPeriodSliced, 'total')
                },
                {
                    label: str('interest'),
                    backgroundColor: 'rgba(255,99,132,1)',
                    data: this.buildDataForDataset(paymentDetailsPerPeriodSliced, 'interest')
                }
            ]
        };

        const options = {
            tooltips: {
                enabled: true,
                mode: 'label',
                callbacks: {
                    label: (tooltipItem, data2) => {
                        return formatWholeDollarAmount(tooltipItem.yLabel);
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        callback: (label, index, labels) => {
                            return formatWholeDollarAmount(label);
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: paymentPeriodLabel
                    }
                }],
                xAxes: [{
                    ticks: {
                        callback: (label, index, labels) => {
                            return label;
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: yearlyGraph ? str('years') : str('months')
                    }
                }]
            }
        };
        return (
            <div className={cx('PaymentsGraphContainer', className)}>
                <h3 className='graphTitle'>{str('paymentsGraph')}</h3>
                <div className='granularitySelectionWrapper'>
                    <label><input type='radio' value='monthly' checked={monthlyGraph} onChange={this.handleChangeGranularity} /> {str('monthly')} </label>
                    <label><input type='radio' value='yearly' checked={yearlyGraph} onChange={this.handleChangeGranularity} /> {str('yearly')} </label>
                </div>
                {monthlyGraph ?
                    <div className='chooseYearWrapper'>
                        <span className='chooseYearWrapperLabel'>{str('year')}</span>
                        <span className='glyphicon glyphicon-triangle-right addYearIcon' aria-hidden='true' onClick={this.addYearToStartIndex}></span>
                        <select className='chooseYearDropdown' value={this.state.startIndex} onChange={this.handleStartIndexChange}>
                            {_.range(0, paymentDetailsPerYear.length).map(yearNum => <option key={yearNum} value={yearNum * 12}>{yearNum + 1}</option>)}
                        </select>
                        <span className='glyphicon glyphicon-triangle-left goBackYearIcon' aria-hidden='true' onClick={this.reduceYearFromStartIndex}></span>
                    </div> : null
                }
                <Line data={data} options={options} width={width} height={height} redraw={redraw} />
            </div>
        );
    }

    redraw = false

    state = {
        startIndex: 0,
        yearlyGraph: true
    }

    handleStartIndexChange = ({ target }) => {
        const newStartIndex = target.value;
        this.setState({
            startIndex: Number(newStartIndex)
        });
    }

    addYearToStartIndex = () => {
        const newStartIndex = this.state.startIndex + 12;
        if (newStartIndex >= this.props.paymentDetailsPerMonth.length) {
            return;
        }
        this.setState({
            startIndex: newStartIndex
        });
    }

    reduceYearFromStartIndex = () => {
        const newStartIndex = this.state.startIndex - 12;
        if (newStartIndex < 0) {
            return;
        }
        this.setState({
            startIndex: newStartIndex
        });
    }

    buildDataForDataset = (paymentDetailsPerPeriodSliced, fieldName) => {
        return paymentDetailsPerPeriodSliced.map(periodPaymentDetails => removeAllDecimals(periodPaymentDetails[fieldName]));
    }

    handleChangeGranularity = ({ target }) => {
        // The labels don't get updated correctly if there is no redraw so after changing granularity
        // we need to make sure to redraw
        this.redraw = true;
        this.setState({
            yearlyGraph: target.value === 'yearly',
            startIndex: 0
        });
    }

}

export default PaymentsGraph;