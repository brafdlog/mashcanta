import React, { PropTypes } from 'react';
import { List, ListItem, ListItemContent, ListItemAction, IconButton } from 'react-mdl';
import './MortgageInfoInputForm.scss';
import Flex from './Flex';
import InfoInputCell from './InfoInputCell';
import { formatWholeDollarAmount, formatPrecent } from '../utils';

const { func, shape, number, arrayOf, string } = PropTypes;

class MortgageInfoInputForm extends React.Component {

    static propTypes = {
        handleChange: func,
        handleDelete: func,
        handleMoveUp: func,
        handleMoveDown: func,
        mortgageParts: arrayOf(shape({
            id: string,
            order: number,
            loanAmount: number,
            numYears: number,
            yearlyInterest: number,
            monthlyPayment: number
        }))
    }

    render() {
        return (
            <div className='MortgageInfoInputFormContainer'>
                <List>
                    <ListItem className='headingListItem listItem' key='heading'>
                        <ListItemContent>
                            <Flex>
                                <span> Loan Amount </span>
                                <span> Years </span>
                                <span> Interest </span>
                                <span> Monthly payment </span>
                            </Flex>
                        </ListItemContent>
                    </ListItem>
                    {this.props.mortgageParts.map(part => {
                        return (
                            <ListItem className='listItem' key={part.id}>
                                <ListItemContent>
                                    <Flex>
                                        <InfoInputCell content={part.loanAmount} onContentChange={this.buildChangeHandler(part, 'loanAmount')} cellFormatter={formatWholeDollarAmount} />
                                        <InfoInputCell content={part.numYears} onContentChange={this.buildChangeHandler(part, 'numYears')} width={40} />
                                        <InfoInputCell content={part.yearlyInterest} onContentChange={this.buildChangeHandler(part, 'yearlyInterest')} cellFormatter={formatPrecent} width={40} />
                                        <InfoInputCell content={part.monthlyPayment} onContentChange={this.buildChangeHandler(part, 'monthlyPayment')} cellFormatter={formatWholeDollarAmount} disabled width={70} />
                                    </Flex>
                                </ListItemContent>
                                <ListItemAction className='listItemAction'>
                                    <div className='iconsContainer'>
                                        <IconButton name='keyboard_arrow_up' onClick={this.buildMoveHandler('up', part.id)} />
                                        <IconButton name='keyboard_arrow_down' onClick={this.buildMoveHandler('down', part.id)} />
                                        <IconButton name='delete' onClick={this.buildDeleteHandler(part.id)} />
                                    </div>
                                </ListItemAction>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }

    buildChangeHandler(part, propName) {
        return this.onChange.bind(this, part.id, propName);
    }

    buildDeleteHandler(partId) {
        return this.onDelete.bind(this, partId);
    }

    buildMoveHandler(direction, partId) {
        if (direction === 'up') {
            return this.props.handleMoveUp.bind(this, partId);
        }
        return this.props.handleMoveDown.bind(this, partId);
    }

    onChange(partId, propChanged, newValue) {
        const originalPart = this.props.mortgageParts.find(part => part.id === partId);
        const updatedPart = { ...originalPart, [propChanged]: newValue };
        this.props.handleChange(updatedPart);
    }

    onDelete(partId) {
        this.props.handleDelete(partId);
    }

}

export default MortgageInfoInputForm;