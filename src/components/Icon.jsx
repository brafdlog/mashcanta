import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import _ from 'lodash';

const { string, func, oneOfType, number } = PropTypes;

const addPxIfIsNumber = num => {
    // Is number doesn't work here because it considers NaN to be a number
    return _.isFinite(Number(num)) ? `${num}px` : num;
};

const Icon = observer(({ id, className, color = 'black', width, height, onClick }) => {
    // Default to having width equal height when only one of them is defined
    if (height && (!width && width !== 0)) {
        width = height; // eslint-disable-line no-param-reassign
    }
    if (width && (!height && height !== 0)) {
        height = width; // eslint-disable-line no-param-reassign
    }

    const svgElementStyle = {
        width: addPxIfIsNumber(width),
        height: addPxIfIsNumber(height)
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
});

Icon.propTypes = {
    id: string,
    color: string,
    width: oneOfType([string, number]),
    height: oneOfType([string, number]),
    onClick: func
};

export default Icon;