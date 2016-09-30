import React, { PropTypes } from 'react';
import Flex from './Flex.jsx';
import { observer } from 'mobx-react';
import styles from './InfoLine.scss';

const { string, number, oneOfType } = PropTypes;

const InfoLine = observer(props => {
    return (
        <Flex className={styles.InfoLine}>
            <div className='infoLineTitle'><b>{props.title}</b>:</div>
            <div>{props.value}</div>
        </Flex>
    );
});

InfoLine.propTypes = {
    title: string,
    value: oneOfType([string, number])
};

export default InfoLine;