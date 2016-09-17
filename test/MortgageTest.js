/* eslint-disable */
import { expect } from 'chai';
import * as calculator from '../src/calculator';
import { KEREN_SHAVA, SHPITZER } from '../src/consts';
import { observer } from 'mobx';
import { mortgagesState } from '../src/store/MortgagesStateStore';
import { Mortgage } from '../src/store/Mortgage';

const ALLOWED_DIFFERENCE = 1;

describe('Mortgage tests', function() {

    it('should have zero values by default', function() {
        const mortgage = new Mortgage();
        expect(mortgage.mortgageParts.length).to.equal(0);

        expect(mortgage.monthlyPayment).to.equal(0);
        expect(mortgage.totalPaymentToBank).to.equal(0);
        expect(mortgage.costOfEachDollar).to.equal(0);
        expect(mortgage.paymentDetailsPerMonth).to.deep.equal([]);
    });

    it('should add mortgage part with zero values by default', function() {
        const mortgage = new Mortgage();

        mortgage.addMortgagePart();
        expect(mortgage.mortgageParts.length).to.equal(1);

        const firstMortgagePart = mortgage.mortgageParts[0];

        expect(firstMortgagePart.loanAmount).to.equal(0);
        expect(firstMortgagePart.numYears).to.equal(0);
        expect(firstMortgagePart.yearlyInterest).to.equal(0);
        expect(firstMortgagePart.amortizationType).to.equal(SHPITZER);

        expect(mortgage.monthlyPayment).to.equal(0);
        expect(mortgage.totalPaymentToBank).to.equal(0);
        expect(mortgage.costOfEachDollar).to.equal(0);
        expect(mortgage.paymentDetailsPerMonth).to.deep.equal([]);
    });

    it('should add mortgage part with with the values past to the addMortgagePart function', function() {
        const mortgage = new Mortgage();

        mortgage.addMortgagePart({
            loanAmount: 700000,
            numYears: 15,
            yearlyInterest: 3,
            amortizationType: KEREN_SHAVA
        });

        expect(mortgage.mortgageParts.length).to.equal(1);

        const firstMortgagePart = mortgage.mortgageParts[0];

        expect(firstMortgagePart.loanAmount).to.equal(700000);
        expect(firstMortgagePart.numYears).to.equal(15);
        expect(firstMortgagePart.yearlyInterest).to.equal(3);
        expect(firstMortgagePart.amortizationType).to.equal(KEREN_SHAVA);
    });

    it('should calculate mortgage values from the parts correctly', function() {
        const mortgage = new Mortgage();

        mortgage.addMortgagePart({
            loanAmount: 700000,
            numYears: 15,
            yearlyInterest: 3,
            amortizationType: KEREN_SHAVA
        });

        expect(mortgage.monthlyPayment).to.be.closeTo(5638, ALLOWED_DIFFERENCE);
        expect(mortgage.totalPaymentToBank).to.be.closeTo(858375, ALLOWED_DIFFERENCE);
        expect(mortgage.costOfEachDollar).to.be.closeTo(1.226, ALLOWED_DIFFERENCE);
        expect(mortgage.paymentDetailsPerMonth.length).to.equal(15*12);

        mortgage.addMortgagePart({
            loanAmount: 50000,
            numYears: 10,
            yearlyInterest: 6,
            amortizationType: SHPITZER
        });

        expect(mortgage.monthlyPayment).to.be.closeTo(6193, ALLOWED_DIFFERENCE);
        expect(mortgage.totalPaymentToBank).to.be.closeTo(924987, ALLOWED_DIFFERENCE);
        expect(mortgage.costOfEachDollar).to.be.closeTo(1.233, ALLOWED_DIFFERENCE);
        expect(mortgage.paymentDetailsPerMonth.length).to.equal(15*12);
    });

});