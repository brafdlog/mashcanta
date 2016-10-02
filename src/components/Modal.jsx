import React from 'react';
import styles from './Modal.scss';
import { observer } from 'mobx-react';
const { string, number, bool } = React.PropTypes;

function Modal(props) {
    const backgroundColor = props.backgroundColor || 'rgba(0, 0, 0, 0.3)';
    const zIndex = props.zIndex || 100;

    const position = props.positionFixed ? 'fixed' : 'absolute';
    return (
        <div className={styles.modalWrapper} style={{ backgroundColor, zIndex, position }}>
            {this.props.children}
        </div>
    );
}

Modal.propTypes = {
    backgroundColor: string,
    zIndex: number,
    positionFixed: bool
};

export default observer(Modal);