import React, { PropTypes } from 'react';
import Flex from './Flex.jsx';

const { string, number } = PropTypes;

const InfoLine = props => {
    return (
        <Flex column>
            <div><b>{props.title}</b></div>
            <div>{props.value}</div>
        </Flex>
    );
};

InfoLine.propTypes = {
    title: string,
    value: number
};

export default InfoLine;