import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import _ from 'lodash';

const { string } = PropTypes;

const addPxIfIsNumber = num => {
    return _.isNumber(Number(num)) ? `${num}px` : num;
};

const Icon = observer(({ id, className, color = 'black', width = 35, height = 35 }) => {
    const svgElementStyle = {
        width: addPxIfIsNumber(width),
        height: addPxIfIsNumber(height)
    };

    const useElementStyle = {};
    if (color) {
        useElementStyle.fill = color;
    }
    return (
        <span>
            <svg className={cx(className)} style={svgElementStyle}>
                <use xlinkHref={`#${id}`} style={useElementStyle} />
            </svg>
        </span>
    );
});

Icon.propTypes = {
    id: string,
    color: string,
    width: string,
    height: string
};

export default Icon;