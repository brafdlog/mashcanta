import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './HeadingSection.scss';
import str from '../localization';

const { func, bool } = PropTypes;

const HeadingSection = observer(props => {
    return (
        <div className={styles.headingSection}>
            <div className={styles.textContainer}>
                <h1 className={styles.headingSectionTitle}> פיננסי - מחשבון משכנתא</h1>
                <p className={styles.headingSectionParagraph}>
                מחשבון משכנתא חכם וקל לשימוש. המחשבון מראה בצורה
                גרפית ברורה את התשלומים על המשכנתא ומאפשר
                להשוות בקלות בין אפשרויות שונות לבניית תמהיל המשכנתא.
                </p>
                {props.showLoginButton ? <div className={styles.loginButton} onClick={props.handleLoginClick}> {str('login')} </div> : null}
            </div>
        </div>
    );
});

HeadingSection.propTypes = {
    showLoginButton: bool,
    handleLoginClick: func
};

export default HeadingSection;