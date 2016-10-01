import React, { PropTypes } from 'react';
import Flex from './Flex.jsx';
import { observer } from 'mobx-react';
import styles from './InfoLine.scss';
import cx from 'classnames';

const { string, number, oneOfType, bool } = PropTypes;

const InfoLine = observer(props => {
    return (
        <Flex className={cx(props.className, styles.InfoLine, { [styles.highlighted]: props.highlighted })} align='center' justify='center'>
            {props.title}
            <span className={styles.value}>{props.value}</span>
        </Flex>
    );
});

InfoLine.propTypes = {
    title: string,
    value: oneOfType([string, number]),
    highlighted: bool,
    className: string
};

export default InfoLine;