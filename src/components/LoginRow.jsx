import React from 'react';
import str from '../localization';
import './LoginRow.scss';
const { func, shape, string } = React.PropTypes;

export const LoginRow = (props) => {
    return (
        <div className='row loginRow'>
            {props.user ?
                <div className='col-md-offset-10 col-md-2'>
                    {props.user.imageUrl ? <img className='userPicture' src={props.user.imageUrl} alt="User's picture" /> : null}
                    <a className='logoutLink' onClick={props.signOut}>{str('logout')}</a>
                </div> :
                <div className='col-md-offset-9 col-md-3'>
                    <img className='loginButton' src='/facebook_login.png' alt='Facebook login' onClick={props.facebookLogin} />
                    <img className='loginButton' src='/google_login.png' alt='Google login' onClick={props.googleLogin} />
                </div>
            }
        </div>
    );
};

LoginRow.propTypes = {
    user: shape({
        id: string,
        name: string
    }),
    facebookLogin: func,
    googleLogin: func,
    signOut: func
};