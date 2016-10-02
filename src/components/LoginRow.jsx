import React from 'react';
import { observer } from 'mobx-react';
import str from '../localization';
import styles from'./LoginRow.scss';
import cx from 'classnames';
import { STORAGE_PATH_PREFIX } from '../consts';
const { func, shape, string } = React.PropTypes;

function LoginRow(props) {
    return (
        <div className={cx(styles.loginRow, props.className)}>
            {props.user ?
                <div>
                    {props.user.imageUrl ? <img className={styles.userPicture} src={props.user.imageUrl} alt="User's picture" /> : null}
                    <a className={styles.logoutLink} onClick={props.signOut}>{str('logout')}</a>
                </div> :
                <div>
                    <img className={styles.loginButton} src={`${STORAGE_PATH_PREFIX}images/facebook_login.png`} alt='Facebook login' onClick={props.facebookLogin} />
                    <img className={styles.loginButton} src={`${STORAGE_PATH_PREFIX}images/google_login.png`} alt='Google login' onClick={props.googleLogin} />
                </div>
            }
        </div>
    );
}

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

export default observer(LoginRow);