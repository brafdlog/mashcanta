import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import './Toggle.scss';

const { bool, func, string } = PropTypes;

const Toggle = observer(props => {
    const handleChange = props.onChange.bind(this, !props.on);
    return (
        <span className='toggleWrapper'>
            {props.title ? <span className='title'>{props.title}</span> : null}
            <label className='switch'>
                <input type='checkbox' checked={props.on} onChange={handleChange} />
                <div className='slider'></div>
            </label>
        </span>
    );
});

Toggle.propTypes = {
    on: bool,
    onChange: func,
    title: string
};

export default Toggle;