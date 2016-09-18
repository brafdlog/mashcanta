import React from 'react';
const { func, shape, string, arrayOf } = React.PropTypes;

export const ManageMortgagesRow = (props) => {
    return (
        <div className='row'>
            <div className='col-md-4'>
                <select className='chooseMortgageDropdown' value={props.currentMortgage.id} onChange={props.onChangeCurrentMortgage}>
                    {props.mortgages.map(mortgage => <option key={mortgage.id} value={mortgage.id}>{mortgage.id}</option>)}
                </select>
                <a onClick={props.createNewMortgage}>Add mortgage</a>
            </div>
        </div>
    );
};

ManageMortgagesRow.propTypes = {
    currentMortgage: shape({
        id: string,
        name: string
    }),
    onChangeCurrentMortgage: func,
    mortgages: arrayOf(shape({
        id: string,
        name: string
    })),
    createNewMortgage: func
};