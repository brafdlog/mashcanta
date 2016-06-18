import React, { PropTypes } from 'react';
import { formattedStringToNumber } from '../utils';
import './InfoInputCell.scss';

const { func, string, number, oneOfType, bool } = PropTypes;

class InfoInputCell extends React.Component {

    static propTypes = {
        content: oneOfType([string, number]),
        onContentChange: func,
        label: string,
        width: number,
        cellFormatter: func,
        disabled: bool,
        marginLeft: number
    }

    static defaultProps = {
        width: 100,
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
    }

    render() {
        const { width, marginLeft } = this.props;
        const style = {
            width: width + 'px'
        };
        if (marginLeft) {
            style.marginLeft = marginLeft + 'px';
        }
        // Get content to display from state
        const content = this.state.content;
        const formattedContent = this.props.cellFormatter(content);
        return (
            <div className='InfoInputCellContainer'>
                <input className='cellInput' onChange={this.handleChange} onBlur={this.handleBlur} value={formattedContent} style={style}
                    onKeyPress={this.handleKeyPress} ref={this.saveInputElement}
                />
            </div>
        );
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
        const numberWithoutFormatting = this.getUnformattedContentFromEvent(event);
        this.setState({
            content: numberWithoutFormatting
        });
    }

    getUnformattedContentFromEvent = event => {
        const newContent = event.target.value;
        const numberWithoutFormatting = formattedStringToNumber(newContent);
        return numberWithoutFormatting;
    }

}

export default InfoInputCell;