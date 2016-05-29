import React from 'react';
import Flex from './Flex.jsx';

export default props => {
    return <Flex column>
                <div><b>{props.title}</b></div>
                <div>{props.value}</div>
            </Flex>;
};