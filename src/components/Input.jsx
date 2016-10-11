import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './Input.scss';
import { WHOLE_DOLLAR_AMOUT, PERCENT } from '../consts';
import { formatWholeDollarAmount, formatPercent } from '../utils';
import { observer } from 'mobx-react';

const { string, number, oneOf, func, bool, object, oneOfType } = PropTypes;

@observer
class Input extends React.Component {

    static propTypes = {
        className: string,
        invalidClassName: string,
        value: oneOfType([string, number]),
        onChange: func,
        onBlur: func,
        // Attributes that will be added to the input dom element
        domAttributes: object,
        // If true, when input is focused, all the text will be selected
        selectAllInputOnFocus: bool,
        displayFormattingType: oneOf([WHOLE_DOLLAR_AMOUT, PERCENT]),
        displayFormattingFunction: func,
        validationFunction: func,
        readOnly: bool
    }

    static defaultProps = {
        selectAllInputOnFocus: true
    }

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            isFocused: false
        };
    }

    render() {
        const { className, domAttributes, invalidClassName, readOnly } = this.props;
        const { value, isFocused, validationErrors } = this.state;
        const isInvalid = validationErrors;
        const inputEventHandlerProps = readOnly ? null : {
            onBlur: this.handleInputBlur,
            onChange: this.handleInputChange,
            onKeyPress: this.handleKeyPress,
            onFocus: this.handleFocus
        };
        // Only run formatting when not focused to prevent issues with formatting not allowing user input
        const valueToDisplay = isFocused ? value : this.formatForDisplay(value);
        // If got a custom invalid calss name, use it. Otherwise use the default invalid styles
        const classNameIfInvalid = invalidClassName || styles.invalid;
        return (
            <input type='text' className={cx(styles.inputField, className, { [classNameIfInvalid]: isInvalid })} value={valueToDisplay}
                {...inputEventHandlerProps} {...domAttributes} readOnly={readOnly}
            />
        );
    }

    componentWillReceiveProps(nextProps) {
        // If the value has changed from the outside (for example for calculated fields), update it
        this.setState({
            value: nextProps.value
        });
    }

    handleFocus = ({ target }) => {
        this.setState({
            isFocused: true
        }, () => {
            // This needs to run after the state is set, otherwise the selection is lost
            if (this.props.selectAllInputOnFocus) {
                // Select all text in the input
                target.setSelectionRange(0, target.value.length);
            }
        });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur();
        }
    }

    handleInputChange = ({ target }) => {
        const value = target.value;
        const onChange = this.props.onChange;

        // If got an onChange from outside, run it
        onChange && onChange(value, target);

        const validationErrors = this.runValidations(value);
        this.setState({
            value,
            validationErrors
        });
    }

    handleInputBlur = ({ target }) => {
        const { onBlur, value: valueBeforeChange } = this.props;
        const stateUpdates = {
            isFocused: false
        };
        if (this.state.validationErrors) {
            // If the input is not valid, revert back to the saved value so we don't save invalid values
            stateUpdates.value = valueBeforeChange;
        } else {
            onBlur && onBlur(target.value, target);
        }
        this.setState(stateUpdates);
    }

    runValidations = value => {
        const { validationFunction } = this.props;
        const validationErrors = validationFunction && validationFunction(value);
        return validationErrors;
    }

    formatForDisplay = (value) => {
        const { displayFormattingType, displayFormattingFunction } = this.props;
        let formatFunction;
        switch(displayFormattingType) {
        case WHOLE_DOLLAR_AMOUT:
            formatFunction = formatWholeDollarAmount;
            break;
        case PERCENT:
            formatFunction = formatPercent;
            break;
        }

        // If displayFormattingType was not defined, use displayFormattingFunction if it was defined
        formatFunction = formatFunction || displayFormattingFunction;

        if (formatFunction) {
            return formatFunction(value);
        } else {
            return value;
        }
    }

}

export default Input;