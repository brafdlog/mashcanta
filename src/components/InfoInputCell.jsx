import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Textfield } from 'react-mdl';
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
        disabled: bool
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
            isBeingEdited: false
        };
        this.isNumericContent = _.isNumber(props.content);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { label, content, width } = this.props;
        const style = {
            width: width + 'px'
        };
        const formattedContent = this.props.cellFormatter(content);
        return (
            <div className='InfoInputCellContainer'>
                <Textfield
                    onChange={this.onChange}
                    label={label}
                    value={formattedContent}
                    style={style}
                    disabled={this.props.disabled}
                />
            </div>
        );
    }

    onChange = (event) => {
        const newContent = event.target.value;
        const numberWithoutFormatting = formattedStringToNumber(newContent);
        this.props.onContentChange(numberWithoutFormatting);
    };

}

export default InfoInputCell;