import React from 'react';
import str from '../localization';
import './LoginRow.scss';
const { func, shape, string } = React.PropTypes;

export const LoginRow = (props) => {
    return (
        <div className='row loginRow'>
            <div className='col-md-offset-10 col-md-2'>
                {props.user ?
                    <div>
                        {props.user.imageUrl ? <img src={props.user.imageUrl} alt="User's picture" /> : null}
                        <a className='logoutLink' onClick={props.signOut}>{str('logout')}</a>
                    </div> :
                    <button type='button' className='btn btn-primary' onClick={props.signIn}>{str('login')}</button>
                }
            </div>
        </div>

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