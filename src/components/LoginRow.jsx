import React from 'react';
import str from '../localization';
import styles from'./LoginRow.scss';
import cx from 'classnames';
const { func, shape, string } = React.PropTypes;

export const LoginRow = (props) => {
    return (
        <div className={cx(styles.loginRow, props.className)}>
            {props.user ?
                <div>
                    {props.user.imageUrl ? <img className={styles.userPicture} src={props.user.imageUrl} alt="User's picture" /> : null}
                    <a className={styles.logoutLink} onClick={props.signOut}>{str('logout')}</a>
                </div> :
                <div>
                    <img className={styles.loginButton} src='/facebook_login.png' alt='Facebook login' onClick={props.facebookLogin} />
                    <img className={styles.loginButton} src='/google_login.png' alt='Google login' onClick={props.googleLogin} />
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
    signOut: func,
    className: string
};