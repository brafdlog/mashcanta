import React from 'react';
import { observer } from 'mobx-react';
import Icon from './Icon';
import str from '../localization';
import styles from'./LoginModal.scss';
import cx from 'classnames';
const { func, string } = React.PropTypes;

function LoginModal(props) {
    return (
        <div className={cx(styles.loginModal, props.className)}>
            <Icon className={styles.closeIcon} id='delete' height='13' onClick={props.closeModal} />
            <p className={styles.loginModalText}> {str('loginModalText')}</p>
            <div className={cx(styles.loginButton, styles.googleLogin)} onClick={props.googleLogin}>
                <Icon id='google' height='20' width='20' color='white' />
                <span className={styles.loginText}>Sign in with Google</span>
            </div>
            <div className={cx(styles.loginButton, styles.facebookLogin)} onClick={props.facebookLogin}>
                <Icon id='facebook' height='20' width='20' color='white' />
                <span className={styles.loginText}>Sign in with Facebook</span>
            </div>
        </div>
    );
}

LoginModal.propTypes = {
    facebookLogin: func,
    googleLogin: func,
    className: string,
    closeModal: func
};

export default observer(LoginModal);