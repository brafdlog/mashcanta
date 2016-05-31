import React from 'react';
import Flex from './Flex.jsx';
import MortgageInfoInputForm from './MortgageInfoInputForm';
import MortgageDetailsDisplay from './MortgageDetailsDisplay';
import * as Calculator from '../calculator';

class Root extends React.Component {
    render() {
        return (
            <Flex className='container'>
                {this.state.mortgageParts.map(mortgagePart =>
                    <Flex key={mortgagePart.index} className='container'>
                        <MortgageInfoInputForm handleChange={this.onChangeMortgageInfoInput} />
                        <MortgageDetailsDisplay mortgageInfo={mortgagePart} />
                    </Flex>
                )
                }
            </Flex>
        );
    }

    state = {
        mortgageParts: [
            {
                index: 0,
                loanAmount: 0,
                monthlyPayment: 0,
                totalPaymentToBank: 0,
                costOfEachDollar: 0
            }
        ]
    };

    onChangeMortgageInfoInput = (updatedMortgageInput) => {
        const mortgageInfo = Calculator.getMortgageInfo(updatedMortgageInput);
        // Turn string fields intp numbers
        Object.keys(mortgageInfo).forEach(key => {
            mortgageInfo[key] = Number(mortgageInfo[key]);
        });
        this.setState({ mortgageParts: [mortgageInfo]});
    }


}

export default Root;