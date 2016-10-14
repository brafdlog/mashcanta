/* eslint id-length: "off" */
import React, { PropTypes } from 'react';
import cx from 'classnames';
import str from '../../localization';
import { CSS } from '../../consts';
import { removeAllDecimals, formatWholeDollarAmount, convertRgbToRgba } from '../../utils';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import styles from './PaymentsGraph.scss';
import { observer } from 'mobx-react';

const { string, number, arrayOf, shape, bool } = PropTypes;

const DATASET_FOR_EMPTY_GRAPH = [
    {
        label: '',
        // transparent
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        data: [1000, 2000, 3000, 4000, 5000]
    }
];

@observer
class PaymentsGraph extends React.Component {

    static propTypes = {
        className: string,
        paymentDetailsPerYear: arrayOf(shape({
            principal: number,
            interest: number,
            total: number
        })).isRequired,
        maxElements: number,
        isEmptyData: bool,
        isSmallScreen: bool
    }

    static defaultProps = {
        maxElements: 40
    }

    render() {
        const { className, maxElements, paymentDetailsPerYear, isEmptyData, isSmallScreen } = this.props;
        const startIndex = this.state.startIndex;
        const endIndex = Math.min(startIndex + maxElements, paymentDetailsPerYear.length);
        const paymentDetailsPerPeriodSliced = paymentDetailsPerYear.slice(startIndex, endIndex);
        const numXValues = paymentDetailsPerPeriodSliced.length;

        const redraw = this.redraw;
        if (redraw) {
            this.redraw = false;
        }

        const paymentPeriodLabel = str('averageMonthlyPayment');

        const data = {
            labels: _.range(1, numXValues + 1),
            // If there is no data to show, display an empty graph with the correct scales
            datasets: isEmptyData ? DATASET_FOR_EMPTY_GRAPH : [
                {
                    label: str('total'),
                    backgroundColor: convertRgbToRgba(CSS.tealRGB, 0.6),
                    data: this.buildDataForDataset(paymentDetailsPerPeriodSliced, 'total')
                },
                {
                    label: str('interest'),
                    backgroundColor: convertRgbToRgba(CSS.purpleRGB, 0.8),
                    data: this.buildDataForDataset(paymentDetailsPerPeriodSliced, 'interest')
                }
            ]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                enabled: true,
                mode: 'label',
                callbacks: {
                    label: (tooltipItem, data2) => {
                        return formatWholeDollarAmount(tooltipItem.yLabel);
                    }
                }
            },
            legend: {
                display: true,
                position: 'bottom'
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
                        labelString: str('years')
                    }
                }]
            }
        };
        return (
            <div className={cx(styles.PaymentsGraphContainer, className)}>
                <Line data={data} options={options} redraw={redraw} height={isSmallScreen ? null : 350} />
            </div>
        );
    }

    redraw = false

    state = {
        startIndex: 0
    }

    handleStartIndexChange = ({ target }) => {
        const newStartIndex = target.value;
        this.setState({
            startIndex: Number(newStartIndex)
        });
    }

    addYearToStartIndex = () => {
        const newStartIndex = this.state.startIndex + 1;
        if (newStartIndex >= this.props.paymentDetailsPerYear.length) {
            return;
        }
        this.setState({
            startIndex: newStartIndex
        });
    }

    reduceYearFromStartIndex = () => {
        const newStartIndex = this.state.startIndex - 1;
        if (newStartIndex < 0) {
            return;
        }
        this.setState({
            startIndex: newStartIndex
        });
    }

    buildDataForDataset = (paymentDetailsPerYearSliced, fieldName) => {
        return paymentDetailsPerYearSliced.map(periodPaymentDetails => removeAllDecimals(periodPaymentDetails[fieldName]));
    }

}

export default PaymentsGraph;