import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './HeadingSection.scss';
import str from '../localization';

const { string, func, shape } = PropTypes;

const HeadingSection = observer(props => {
    return (
        <div className={styles.headingSection}>
            <h1 className={styles.headingSectionTitle}> מחשבון משכנתא</h1>
            <p className={styles.headingSectionParagraph}>מחשבון משכנתא חכם וקל לשימוש. המחשבון מראה בצורה
            גרפית ברורה את התשלומים על המשכנתא ומאפשר
    להשוות בקלות בין אפשרויות שונות לבניית תמהיל המשכנתא.
            </p>
            {props.user ? null : <span className={styles.loginButton} onClick={props.handleLoginClick}> {str('login')} </span>}
        </div>
    );
});

HeadingSection.propTypes = {
    user: shape({
        id: string,
        name: string
    }),
    handleLoginClick: func
};

export default HeadingSection;