import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';

const { string } = PropTypes;

const Icon = observer(({ id, className, color = 'black', width = 35, height = 35 }) => {
    const style = {
        width,
        height
    };
    if (color) {
        style.fill = color;
    }
    return (
        <span>
            <svg className={cx(className)} >
                <use xlinkHref={`#${id}`} style={style} />
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