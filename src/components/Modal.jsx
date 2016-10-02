import React from 'react';
import styles from './Modal.scss';
import { observer } from 'mobx-react';
const { string } = React.PropTypes;

function Modal(props) {
    const backgroundColor = props.backgroundColor || 'rgba(0, 0, 0, 0.3)';
    return (
        <div className={styles.modalWrapper} style={{ backgroundColor }}>
            {this.props.children}
        </div>
    );
}

Modal.propTypes = {
    backgroundColor: string
};

export default observer(Modal);