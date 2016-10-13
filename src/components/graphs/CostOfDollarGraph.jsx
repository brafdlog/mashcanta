import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './CostOfDollarGraph.scss';
import str from '../../localization';
import { removeAllDecimals, formatWholeDollarAmount } from '../../utils';
import { CSS } from '../../consts';
import { Doughnut } from 'react-chartjs-2';
import { observer } from 'mobx-react';

const { string, number, bool } = PropTypes;

const EMPTY_DATA = [3000, 0];

@observer
class CostOfDollarGraph extends React.Component {

    static propTypes = {
        className: string,
        loanAmount: number,
        loanCost: number,
        isEmptyData: bool
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
                data: isEmptyData ? EMPTY_DATA : [loanCostFormatted, loanAmountFormatted],
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
        return (
            <div className={cx(styles.CostOfDollarGraphContainer, className)}>
                <h3 className={styles.graphTitle}>{str('loanCost')}</h3>
                <Doughnut data={pieChartData} options={options} />
            </div>
        );
    }

}

export default CostOfDollarGraph;