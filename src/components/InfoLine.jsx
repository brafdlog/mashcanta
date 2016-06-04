import React, { PropTypes } from 'react';
import Flex from './Flex.jsx';
import './InfoLine.scss';

const { string, number, oneOfType } = PropTypes;

const InfoLine = props => {
    return (
        <Flex className='InfoLine'>
            <div className='infoLineTitle'><b>{props.title}</b>:</div>
            <div>{props.value}</div>
        </Flex>
    );
};

InfoLine.propTypes = {
    title: string,
    value: oneOfType([string, number])
};

export default InfoLine;