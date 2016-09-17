import React, { PropTypes } from 'react';
import cx from 'classnames';
import './CostOfDollarGraph.scss';
import str from '../../localization';
import { removeAllDecimals } from '../../utils';
import { Doughnut } from 'react-chartjs-2';
import { observer } from 'mobx-react';

const { string, number } = PropTypes;

@observer
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
            // TODO here need to format the tooltip using formatWholeDollarAmount.
            // The tooltip configuration works but it causes the animation to go crazy
            // tooltips: {
            //     callbacks: {
            //         label: (tooltipItem, data) => {
            //             const mooo = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            //             return formatWholeDollarAmount(mooo);
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