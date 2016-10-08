import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import cx from 'classnames';
import _ from 'lodash';

const { string, func, oneOfType, number } = PropTypes;

@observer
class Icon extends React.Component {

    static propTypes = {
        id: string,
        color: string,
        hoverColor: string,
        width: oneOfType([string, number]),
        height: oneOfType([string, number]),
        onClick: func
    }

    render() {
        const { id, className, color = 'black', hoverColor, onClick } = this.props;
        let { width, height } = this.props;

        // Default to having width equal height when only one of them is defined
        if (height && (!width && width !== 0)) {
            width = height;
        }
        if (width && (!height && height !== 0)) {
            height = width;
        }

        const svgElementStyle = {
            width: this.addPxIfIsNumber(width),
            height: this.addPxIfIsNumber(height)
        };

        if (onClick) {
            svgElementStyle.cursor = 'pointer';
        }

        const colorToFill = this.state.hover ? hoverColor || color : color;
        const useElementStyle = {
            fill: colorToFill
        };

        return (
            <svg className={cx(className)} style={svgElementStyle} onClick={onClick} ref='icon'>
                <use xlinkHref={`#${id}`} style={useElementStyle} />
            </svg>
        );
    }

    state = {
        hover: false
    }

    addPxIfIsNumber = num => {
        // Is number doesn't work here because it considers NaN to be a number
        return _.isFinite(Number(num)) ? `${num}px` : num;
    }

    componentDidMount = () => {
        if (this.props.hoverColor) {
            this.refs.icon.addEventListener('mouseover', this.onMouseOver);
            this.refs.icon.addEventListener('mouseout', this.onMouseOut);
        }
    }

    componentWillUnmount = () => {
        if (this.props.hoverColor) {
            this.refs.icon.removeEventListener('mouseover', this.onMouseOver);
            this.refs.icon.removeEventListener('mouseout', this.onMouseOut);
        }
    }

    onMouseOver = () => {
        this.setState({
            hover: true
        });
    }

    onMouseOut = () => {
        this.setState({
            hover: false
        });
    }

}

export default Icon;