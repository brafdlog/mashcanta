import React from 'react';
import { observer } from 'mobx-react';
import str from '../localization';
import styles from'./UserSection.scss';
import cx from 'classnames';
const { func, shape, string } = React.PropTypes;

function UserSection(props) {
    return (
        <div className={cx(styles.UserSection, props.className)}>
            {props.user ?
                <div>
                    {props.user.imageUrl ? <img className={styles.userPicture} src={props.user.imageUrl} alt="User's picture" /> : null}
                    <a className={styles.logoutLink} onClick={props.signOut}>{str('logout')}</a>
                </div> : null
            }
        </div>
    );
}

UserSection.propTypes = {
    user: shape({
        id: string,
        name: string
    }),
    signOut: func,
    className: string
};

export default observer(UserSection);