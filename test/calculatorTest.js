const expect = require('chai').expect;
const calculator = require('../src/calculator');

describe('Mashcanta calculator', function() {
    describe('loan amount by given monthly payment', function() {
        it('should calculate loan amount for monthly payment of 4350, interest 3.5, 15 years', function() {
            let monthlyPayment = 4350;
            let numYears = 15;
            let interestRate = 3.5;
            monthlyPayment, numYears, interestRate
            let loanAmount = calculator.getLoanAmount(monthlyPayment, numYears, interestRate);
            expect(loanAmount).to.equal(608492);
        });

        it('should calculate loan amount for monthly payment of 4000, interest 2.8, 10 years', function() {
            let monthlyPayment = 4000;
            let numYears = 10;
            let interestRate = 2.8;
            monthlyPayment, numYears, interestRate
            let loanAmount = calculator.getLoanAmount(monthlyPayment, numYears, interestRate);
            expect(loanAmount).to.equal(418234);
        });
    });

    describe('monthly payment', function() {
        it('returns a monthly payment by given loan amount');        
    });

});