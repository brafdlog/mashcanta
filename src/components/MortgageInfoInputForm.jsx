import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './MortgageInfoInputForm.scss';
import { formatWholeDollarAmount, formatPrecent, formattedStringToNumber } from '../utils';
import { KEREN_SHAVA, SHPITZER, BULLET } from '../consts';
import str from '../localization';
import { observer } from 'mobx-react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const { func, shape, number, arrayOf, string, oneOf } = PropTypes;

@observer
class MortgageInfoInputForm extends React.Component {

    static propTypes = {
        handleChange: func,
        handleDelete: func,
        handleMoveUp: func,
        handleMoveDown: func,
        handleAddPart: func,
        className: string,
        mortgageParts: arrayOf(shape({
            id: string,
            order: number,
            loanAmount: number,
            numYears: number,
            yearlyInterest: number,
            monthlyPayment: number,
            amortizationType: oneOf([KEREN_SHAVA, SHPITZER, BULLET])
        }))
    }

    render() {
        const { mortgageParts, className, handleAddPart } = this.props;
        const { selectedPartId } = this.state;

        // The bootsrap table mutates the object it gets as data and this doesn't play nice
        // with mobx. So I give it a copy of the observable data
        const tableData = mortgageParts.map(part => {
            return { ...part.persistableObject, monthlyPayment: part.monthlyPayment };
        });

        return (
            <div className={cx(styles.MortgageInfoInputFormContainer, className)}>
                <BootstrapTable trClassName={styles.tableRow} data={tableData} hover cellEdit={this.cellEditSettings}
                    selectRow={this.selectRowSettings}
                >
                    <TableHeaderColumn columnClassName={styles.columnTd} className={styles.headerTd} dataField='order' isKey dataAlign='center' hidden />
                    <TableHeaderColumn columnClassName={styles.columnTd} className={styles.headerTd} dataField='amortizationType' dataAlign='center' width={'70'} editable={this.amortizationTypeEditSettings} dataFormat={this.amortizationCellFormatter}>{str('amortizationType')}</TableHeaderColumn>
                    <TableHeaderColumn columnClassName={styles.columnTd} className={styles.headerTd} dataField='loanAmount' dataFormat={formatWholeDollarAmount} dataAlign='center' width={'80'}>{str('amount')}</TableHeaderColumn>
                    <TableHeaderColumn columnClassName={styles.columnTd} className={styles.headerTd} dataField='numYears' dataAlign='center' width={'50'}>{str('years')}</TableHeaderColumn>
                    <TableHeaderColumn columnClassName={styles.columnTd} className={styles.headerTd} dataField='yearlyInterest' dataAlign='center' dataFormat={formatPrecent} width={'50'}>{str('interest')}</TableHeaderColumn>
                    <TableHeaderColumn columnClassName={styles.columnTd} className={styles.headerTd} dataField='monthlyPayment' hidden={window.isSmallScreen} dataAlign='center'
                        dataFormat={formatWholeDollarAmount} width={'80'} editable={false}
                    >
                        {str('monthlyPayment')}
                    </TableHeaderColumn>
                </BootstrapTable>
                <button type='button' className={cx('btn', 'btn-info', styles.button)} onClick={handleAddPart}>{str('add')}</button>
                {selectedPartId ? <button type='button' className={cx('btn', 'btn-danger', styles.button)} onClick={this.onDelete}>{str('delete')}</button> : null}
            </div>
        );
    }

    state = {}

    cellEditSettings = {
        mode: 'click',
        blurToSave: true,
        afterSaveCell: this.handleCellEdit.bind(this)
    }

    selectRowSettings = {
        clickToSelect: true,
        onSelect: this.handleRowSelect.bind(this)
    }

    amortizationTypeEditSettings = {
        type: 'select',
        options: {
            values: [SHPITZER, KEREN_SHAVA, BULLET]
        }
    };

    amortizationCellFormatter = amortizationType => {
        if (amortizationType === BULLET) {
            return str('bullet');
        }
        return amortizationType === KEREN_SHAVA ? str('kerenShava') : str('shpitzer');
    }

    handleRowSelect(row, isSelected, event) {
        this.setState({
            selectedPartId: row.id
        });
    }

    handleCellEdit(row, changedProp, newValue) {
        const partId = row.id;

        // For numeric fields make sure to update number and not string
        const valueToUpdate = changedProp === 'amortizationType' ? newValue : formattedStringToNumber(newValue);
        this.onChange(partId, changedProp, valueToUpdate);
    }

    onChange(partId, changedProp, newValue) {
        const originalPart = this.props.mortgageParts.find(part => part.id === partId);
        const updatedPart = { ...originalPart, [changedProp]: newValue };
        this.props.handleChange(updatedPart);
    }

    onDelete = () => {
        const partId = this.state.selectedPartId;
        this.props.handleDelete(partId);
        this.setState({
            selectedPartId: null
        });
    }

}

export default MortgageInfoInputForm;