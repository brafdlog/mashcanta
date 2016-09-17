import React from 'react';
import { observer } from 'mobx-react';
const { string, bool, oneOf, object } = React.PropTypes;

/**
 * Renders the component markup
 * @return {JSX}
 */

const Flex = observer(({ wrap, column, align, justify, auto, style, className, ...props }) => {
    /** Build dynamic style */
    const sx = Object.assign({}, style, {
        display: 'flex',
        flexWrap: wrap ? 'wrap' : null,
        flexDirection: column ? 'column' : null,
        flex: auto ? '1 1 auto' : null,
        alignItems: align || null,
        justifyContent: justify || null
    });

    /** Return markup */
    return <div className={className} style={sx} {...props} />;
});

/**
 * Expected prop types
 * @type {Object}
 */
Flex.propTypes = {
    /** Sets flex-wrap: wrap */
    wrap: bool,
    /** Sets flex-direction: column */
    column: bool,
    /** Sets align-item */
    align: oneOf(['stretch', 'center', 'baseline', 'flex-start', 'flex-end']),
    /** Sets justify-content */
    justify: oneOf(['center', 'space-around', 'space-between', 'flex-start', 'flex-end']),
    /** Sets flex: 1 1 auto */
    auto: bool,
    className: string,
    style: object
};

Flex.defaultProps = {
    /** Sets align-item */
    align: 'flex-start',
    /** Sets justify-content */
    justify: 'flex-start'
};

export default Flex;