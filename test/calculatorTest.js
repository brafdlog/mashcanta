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

            const mortgageInfo = calculator.getMortgagePartInfo({ monthlyPayment, numYears, yearlyInterest: interestRate });
            expect(mortgageInfo.loanAmount).to.be.closeTo(608492, ALLOWED_DIFFERENCE);
            expect(mortgageInfo.totalPaymentToBank).to.equal(783000);
            expect(mortgageInfo.costOfEachDollar).to.be.closeTo(1.286, 0.001);
        });

        it('should calculate loan amount for monthly payment of 4000, interest 2.8, 10 years', function() {
            let monthlyPayment = 4000;
            let numYears = 10;
            let interestRate = 2.8;

            const mortgageInfo = calculator.getMortgagePartInfo({ monthlyPayment, numYears, yearlyInterest: interestRate });
            expect(mortgageInfo.loanAmount).to.be.closeTo(418234, ALLOWED_DIFFERENCE);
            expect(mortgageInfo.totalPaymentToBank).to.equal(480000);
            expect(mortgageInfo.costOfEachDollar).to.be.closeTo(1.148, 0.001);
        });
    });

    describe('monthly payment by given loan amount', function() {
        it('should calculate monthly payment for loan amount of 700000, interest 3.5, 15 years', function() {
            let loanAmount = 700000;
            let numYears = 15;
            let interestRate = 3.5;

            const mortgageInfo = calculator.getMortgagePartInfo({ loanAmount, numYears, yearlyInterest: interestRate });
            expect(mortgageInfo.monthlyPayment).to.be.closeTo(5004, ALLOWED_DIFFERENCE);
            expect(mortgageInfo.totalPaymentToBank).to.be.closeTo(900752, ALLOWED_DIFFERENCE);
            expect(mortgageInfo.costOfEachDollar).to.be.closeTo(1.287, 0.001);
        });

        it('should calculate monthly payment for loan amount of 1190000, interest 6.7, 22 years', function() {
            let loanAmount = 1190000;
            let numYears = 22;
            let interestRate = 6.7;

            const mortgageInfo = calculator.getMortgagePartInfo({ loanAmount, numYears, yearlyInterest: interestRate });
            expect(mortgageInfo.monthlyPayment).to.be.closeTo(8628.21, ALLOWED_DIFFERENCE);
            expect(mortgageInfo.totalPaymentToBank).to.be.closeTo(2277847, ALLOWED_DIFFERENCE);
            expect(mortgageInfo.costOfEachDollar).to.be.closeTo(1.914, 0.001);
        });
    });

});