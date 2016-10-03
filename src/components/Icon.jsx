import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import _ from 'lodash';

const { string, func } = PropTypes;

const addPxIfIsNumber = num => {
    // Is number doesn't work here because it considers NaN to be a number
    return _.isFinite(Number(num)) ? `${num}px` : num;
};

const Icon = observer(({ id, className, color = 'black', width = 35, height = 35, onClick }) => {
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
    width: string,
    height: string,
    onClick: func
};

export default Icon;