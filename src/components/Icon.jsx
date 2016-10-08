import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import _ from 'lodash';

const { string, func, oneOfType, number } = PropTypes;

@observer
class Icon extends React.Component {

    static propTypes = {
        id: string,
        color: string,
        width: oneOfType([string, number]),
        height: oneOfType([string, number]),
        onClick: func
    }

    render() {
        const { id, className, color = 'black', onClick } = this.props;
        let { width, height } = this.props;

        // Default to having width equal height when only one of them is defined
        if (height && (!width && width !== 0)) {
            width = height;
        }
        if (width && (!height && height !== 0)) {
            height = width;
        }

        const svgElementStyle = {
            width: this.addPxIfIsNumber(width),
            height: this.addPxIfIsNumber(height)
        };

        if (onClick) {
            svgElementStyle.cursor = 'pointer';
        }

        const useElementStyle = {};
        if (color) {
            useElementStyle.fill = color;
        }
        return (
            <svg className={cx(className)} style={svgElementStyle} onClick={onClick}>
                <use xlinkHref={`#${id}`} style={useElementStyle} />
            </svg>
        );
    }

    addPxIfIsNumber = num => {
        // Is number doesn't work here because it considers NaN to be a number
        return _.isFinite(Number(num)) ? `${num}px` : num;
    }

}

export default Icon;