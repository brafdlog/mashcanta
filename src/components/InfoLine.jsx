import React, { PropTypes } from 'react';
import Flex from './Flex.jsx';
import { observer } from 'mobx-react';
import styles from './InfoLine.scss';

const { string, number, oneOfType } = PropTypes;

const InfoLine = observer(props => {
    return (
        <Flex className={styles.InfoLine} align='center' justify='center'>
            {props.title}
            <span className={styles.value}>{props.value}</span>
        </Flex>
    );
});

InfoLine.propTypes = {
    title: string,
    value: oneOfType([string, number])
};

export default InfoLine;