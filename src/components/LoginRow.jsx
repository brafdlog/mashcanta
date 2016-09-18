import React from 'react';
import str from '../localization';
const { func, shape, string } = React.PropTypes;

export const LoginRow = (props) => {
    return (
        props.user ?
            <button type='button' className='btn btn-default' onClick={props.signOut}>{str('logout')}</button> :
            <button type='button' className='btn btn-default' onClick={props.signIn}>{str('login')}</button>
    );
};

LoginRow.propTypes = {
    user: shape({
        id: string,
        name: string
    }),
    signIn: func,
    signOut: func
};