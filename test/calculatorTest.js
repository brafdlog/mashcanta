/* eslint-disable */
const expect = require('chai').expect;
const calculator = require('../src/calculator');
const ALLOWED_DIFFERENCE = 0.8;

describe('Mashcanta calculator', function() {
    describe('loan amount by given monthly payment', function() {
        it('should calculate loan amount for monthly payment of 4350, interest 3.5, 15 years', function() {
            let monthlyPayment = 4350;
            let numYears = 15;
            let interestRate = 3.5;

            let loanAmount = calculator.getLoanAmount(monthlyPayment, numYears, interestRate);
            expect(loanAmount).to.be.closeTo(608492, ALLOWED_DIFFERENCE);
        });

        it('should calculate loan amount for monthly payment of 4000, interest 2.8, 10 years', function() {
            let monthlyPayment = 4000;
            let numYears = 10;
            let interestRate = 2.8;

            let loanAmount = calculator.getLoanAmount(monthlyPayment, numYears, interestRate);
            expect(loanAmount).to.closeTo(418234, ALLOWED_DIFFERENCE);
        });
    });

    describe('monthly payment', function() {
        it('returns a monthly payment by given loan amount');        
    });

});