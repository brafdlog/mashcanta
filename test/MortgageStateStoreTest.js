/* eslint-disable */
import { expect } from 'chai';
import * as calculator from '../src/calculator';
import { KEREN_SHAVA, SHPITZER } from '../src/consts';
import { observer } from 'mobx';
import { mortgagesState } from '../src/store/MortgagesStateStore';
import { Mortgage } from '../src/store/Mortgage';

describe('Mortgage state store', function() { 
    it('should initially have one empty mortgage', function() {
        const mortgages = mortgagesState.mortgages;
        expect(mortgages.length).to.equal(1);

        const initialMortgage = mortgages[0];
        expect(initialMortgage.mortgageParts.length).to.equal(0);
        expect(initialMortgage.loanAmount).to.equal(0);
        expect(initialMortgage.monthlyPayment).to.equal(0);
        expect(initialMortgage.totalPaymentToBank).to.equal(0);
        expect(initialMortgage.costOfEachDollar).to.equal(0);
        expect(initialMortgage.paymentDetailsPerMonth).to.deep.equal([]);
    });

    it('should set mortgages', function() {
        let mortgages = mortgagesState.mortgages;
        expect(mortgages.length).to.equal(1);

        const initialMortgage = mortgages[0];
        const initialMortgageId = initialMortgage.id;

        const newMortgages = [ new Mortgage(), new Mortgage()];

        mortgagesState.setMortgages(newMortgages);

        mortgages = mortgagesState.mortgages;
        const mortgageIds = mortgages.map(mortgage => mortgage.id);

        expect(mortgages.length).to.equal(2);
        // Calling set mortgages should have overriden the original mortgages
        expect(mortgageIds).not.to.contain(initialMortgageId);
    });
});