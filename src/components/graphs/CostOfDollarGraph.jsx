import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './CostOfDollarGraph.scss';
import str from '../../localization';
import { removeAllDecimals, formatWholeDollarAmount } from '../../utils';
import { CSS } from '../../consts';
import { Doughnut } from 'react-chartjs-2';
import { observer } from 'mobx-react';

const { string, number, bool } = PropTypes;

const EMPTY_DATA_DATASETS = [{
    data: [3000, 0],
    backgroundColor: ['#F1F1F1']
}];

@observer
class CostOfDollarGraph extends React.Component {

    static propTypes = {
        className: string,
        loanAmount: number,
        loanCost: number,
        isEmptyData: bool
    }

    constructor(props) {
        super(props);
        this.shouldRedraw = false;
    }

    render() {
        const { loanAmount, loanCost, className, isEmptyData } = this.props;

        const loanAmountFormatted = removeAllDecimals(loanAmount);
        const loanCostFormatted = removeAllDecimals(loanCost);

        const pieChartData = {
            labels: [
                str('loanCost'),
                str('loanAmount')
            ],
            datasets: [{
                data: [loanCostFormatted, loanAmountFormatted],
                backgroundColor: [
                    CSS.purple,
                    CSS.teal
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    CSS.teal
                ]
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        const amount = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return formatWholeDollarAmount(amount);
                    }
                }
            }
        };

        // If there is no data, display placeholder empty data
        if (isEmptyData) {
            pieChartData.datasets = EMPTY_DATA_DATASETS;
            options.legend.display = false;
            options.tooltips = {
                callbacks: {
                    label: (tooltipItem, data) => {
                        return str('noDataToDisplay');
                    }
                }
            };
        }

        // There are changes that require redrawing to update, like tooltips and legend option changes
        const redraw = this.shouldRedraw;
        if (redraw) {
            // After redrawing, we reset the flag because we don't want every render to trigger a redraw
            this.shouldRedraw = false;
        }
        return (
            <div className={cx(styles.CostOfDollarGraphContainer, className)}>
                <h3 className={styles.graphTitle}>{str('loanCost')}</h3>
                <div className={styles.innerGraphContainer}>
                    <Doughnut data={pieChartData} options={options} redraw={redraw} />
                </div>

            </div>
        );
    }

    componentWillReceiveProps = (nextProps) => {
        // Empty data changes the tooltips and legend settings and requires a redraw
        if (this.props.isEmptyData !== nextProps.isEmptyData) {
            this.shouldRedraw = true;
        }
    }

}

export default CostOfDollarGraph;