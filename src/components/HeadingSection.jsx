import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './HeadingSection.scss';
import str from '../localization';

const { func, bool } = PropTypes;

const HeadingSection = observer(props => {
    return (
        <div className={styles.headingSection}>
            <h1 className={styles.headingSectionTitle}> מחשבון משכנתא</h1>
            <p className={styles.headingSectionParagraph}>מחשבון משכנתא חכם וקל לשימוש. המחשבון מראה בצורה
            גרפית ברורה את התשלומים על המשכנתא ומאפשר
    להשוות בקלות בין אפשרויות שונות לבניית תמהיל המשכנתא.
            </p>
            {props.showLoginButton ? <span className={styles.loginButton} onClick={props.handleLoginClick}> {str('login')} </span> : null}
        </div>
    );
});

HeadingSection.propTypes = {
    showLoginButton: bool,
    handleLoginClick: func
};

export default HeadingSection;