import React, { PropTypes } from 'react';
import cx from 'classnames';
import rd3 from 'rd3';
import './CostOfDollarGraph.scss';
import str from '../../localization';
import { formatWholeDollarAmount } from '../../utils';
const PieChart = rd3.PieChart;

const { string, number } = PropTypes;

class CostOfDollarGraph extends React.Component {

    static propTypes = {
        className: string,
        loanAmount: number,
        loanCost: number
    }

    render() {
        const { loanAmount, loanCost, className } = this.props;

        const pieChartData = [
            {
                label: str('loanCost'),
                value: loanCost
            },
            {
                label: str('loanAmount'),
                value: loanAmount
            }
        ];
        return (
            <div className={cx('CostOfDollarGraphContainer', className)}>
                <PieChart
                    data={pieChartData}
                    width={450}
                    height={400}
                    radius={110}
                    innerRadius={50}
                    sectorBorderColor='white'
                    hoverAnimation={false}
                    valueTextFormatter={formatWholeDollarAmount}
                    title={str('loanCost')}
                />
            </div>
        );
    }

}

export default CostOfDollarGraph;