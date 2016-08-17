import React, { PropTypes } from 'react';
import cx from 'classnames';
import './CostOfDollarGraph.scss';
import str from '../../localization';
import { removeAllDecimals } from '../../utils';
import { Doughnut } from 'react-chartjs-2';

const { string, number } = PropTypes;

class CostOfDollarGraph extends React.Component {

    static propTypes = {
        className: string,
        loanAmount: number,
        loanCost: number
    }

    render() {
        const { loanAmount, loanCost, className } = this.props;

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
                    '#FF6384',
                    '#36A2EB'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ]
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false
            // TODO here need to format the tooltip using formatWholeDollarAmount
            // tooltips: {
            //     callbacks: {
            //         label: (tooltipItem, data) => {
            //             return tooltipItems.yLabel + 'moo';
            //         }
            //     }
            // }
        };
        return (
            <div className={cx('CostOfDollarGraphContainer', className)}>
                <h3 className='graphTitle'>{str('loanCost')}</h3>
                <Doughnut data={pieChartData} options={options} />
            </div>
        );
    }

}

export default CostOfDollarGraph;