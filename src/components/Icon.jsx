import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';

const { string, number } = PropTypes;

const Icon = observer(({ id, className, color = 'black', width = 35, height = 35 }) => {
    const style = {};
    if (color) {
        style.fill = color;
    }
    return (
        <span>
            <svg className={cx(className)} width={width} height={height} style={style}>
                <use xlinkHref={`#${id}`} />
            </svg>
        </span>
    );
});

Icon.propTypes = {
    id: string,
    color: string,
    width: number,
    height: number
};

export default Icon;