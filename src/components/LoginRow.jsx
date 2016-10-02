import React from 'react';
import { observer } from 'mobx-react';
import str from '../localization';
import styles from'./LoginRow.scss';
import cx from 'classnames';
const { func, shape, string } = React.PropTypes;

function LoginRow(props) {
    return (
        <div className={cx(styles.loginRow, props.className)}>
            {props.user ?
                <div>
                    {props.user.imageUrl ? <img className={styles.userPicture} src={props.user.imageUrl} alt="User's picture" /> : null}
                    <a className={styles.logoutLink} onClick={props.signOut}>{str('logout')}</a>
                </div> : null
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