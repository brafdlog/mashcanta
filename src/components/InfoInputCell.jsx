import React, { PropTypes } from 'react';
import cx from 'classnames';
import { formattedStringToNumber } from '../utils';
import './InfoInputCell.scss';

const { func, string, number, oneOfType, bool } = PropTypes;

class InfoInputCell extends React.Component {

    static propTypes = {
        content: oneOfType([string, number]),
        className: string,
        onContentChange: func,
        label: string,
        width: number,
        cellFormatter: func,
        disabled: bool,
        marginLeft: number
    }

    static defaultProps = {
        label: '',
        // By default do nothing in the cell formatter
        cellFormatter: content => content
    }

    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.saveInputElementReference = this.saveInputElementReference.bind(this);
    }

    render() {
        const { width, marginLeft, disabled, className } = this.props;
        const style = {};

        if (width) {
            style.width = width + 'px';
        }
        if (marginLeft) {
            style.marginLeft = marginLeft + 'px';
        }
        // Get content to display from state
        let content = this.state.content;

        // If the cell is in focus don't format the content
        if (!$(this.inputElement).is(':focus')) {
            content = this.props.cellFormatter(content);
        }
        return (
            <div className={cx('InfoInputCellContainer', className)}>
                <input className='cellInput' onChange={this.handleChange} onBlur={this.handleBlur} value={content} style={style}
                    onKeyPress={this.handleKeyPress} onFocus={this.handleFocus} ref={this.saveInputElementReference} disabled={disabled}
                />
            </div>
        );
    }

    saveInputElementReference(inputElement) {
        this.inputElement = inputElement;
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleBlur(event);
            /* global $ */
            $(this.inputElement).blur();
        }
    }

    state = {
        content: '',
        isBeingEdited: false
    }

    getCellIdentifier() {
        return btoa(this.props.content);
    }

    handleBlur(event) {
        const numberWithoutFormatting = this.getUnformattedContentFromEvent(event);
        this.props.onContentChange(numberWithoutFormatting);
    }

    handleChange(event) {
        const newCellContent = event.target.value;
        this.setState({
            content: newCellContent
        });
    }

    handleFocus(event) {
        const cellContent = event.target.value;
        const contentWithoutFormatting = formattedStringToNumber(cellContent);

        // If the content was zero, clear the cell so the user doesn't need to delete the zero
        const content = contentWithoutFormatting || '';
        this.setState({
            content
        });
    }

    getUnformattedContentFromEvent = event => {
        const newContent = event.target.value || 0;
        const numberWithoutFormatting = formattedStringToNumber(newContent);
        return numberWithoutFormatting;
    }

}

export default InfoInputCell;