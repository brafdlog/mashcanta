/* eslint-disable */
import { expect } from 'chai';
import * as calculator from '../src/calculator';
import { KEREN_SHAVA } from '../src/consts';
const ALLOWED_DIFFERENCE = 0.8;

describe('Mashcanta calculator', function() {
    
    describe('getMortgagePartInfo', function() {

        describe('shpitzer', function() {
            it('should calculate mortgage details for loan amount of 700000, interest 3.5, 15 years', function() {
                let loanAmount = 700000;
                let numYears = 15;
                let interestRate = 3.5;

                const mortgageInfo = calculator.getMortgagePartInfo({ loanAmount, numYears, yearlyInterest: interestRate });
                expect(mortgageInfo.monthlyPayment).to.be.closeTo(5004, ALLOWED_DIFFERENCE);
                expect(mortgageInfo.totalPaymentToBank).to.be.closeTo(900752, ALLOWED_DIFFERENCE);
                expect(mortgageInfo.costOfEachDollar).to.be.closeTo(1.287, 0.001);
                const paymentDetailsPerMonth = mortgageInfo.paymentDetailsPerMonth;

                expect(paymentDetailsPerMonth[0]).to.deep.equal({
                    principal: 2962.51,
                    interest: 2041.67  
                });
                expect(paymentDetailsPerMonth[4]).to.deep.equal({
                    principal: 2997.23,
                    interest: 2006.95
                });
                expect(paymentDetailsPerMonth[13]).to.deep.equal({
                    principal: 3076.83,
                    interest: 1927.35
                });
                expect(paymentDetailsPerMonth[39]).to.deep.equal({
                    principal: 3318.86,
                    interest: 1685.32
                });

            });

            it('should calculate mortgage details for loan amount of 1190000, interest 6.7, 22 years', function() {
                let loanAmount = 1190000;
                let numYears = 22;
                let interestRate = 6.7;

                const mortgageInfo = calculator.getMortgagePartInfo({ loanAmount, numYears, yearlyInterest: interestRate });
                expect(mortgageInfo.monthlyPayment).to.be.closeTo(8628.21, ALLOWED_DIFFERENCE);
                expect(mortgageInfo.totalPaymentToBank).to.be.closeTo(2277847, ALLOWED_DIFFERENCE);
                expect(mortgageInfo.costOfEachDollar).to.be.closeTo(1.914, 0.001);

                const paymentDetailsPerMonth = mortgageInfo.paymentDetailsPerMonth;

                expect(paymentDetailsPerMonth[4]).to.deep.equal({
                    principal: 2028.73,
                    interest: 6599.48
                });
                expect(paymentDetailsPerMonth[17]).to.deep.equal({
                    principal: 2181.01,
                    interest: 6447.2
                });
                expect(paymentDetailsPerMonth[25]).to.deep.equal({
                    principal: 2280.36,
                    interest: 6347.85
                });
                expect(paymentDetailsPerMonth[79]).to.deep.equal({
                    principal: 3080.2,
                    interest: 5548.01
                });
            });
        });

        describe('keren shava', function() {
            it('should calculate mortgage details for loan amount of 700000, interest 3.5, 15 years', function() {
                let loanAmount = 700000;
                let numYears = 15;
                let interestRate = 3.5;

                const mortgageInfo = calculator.getMortgagePartInfo({ loanAmount, numYears, yearlyInterest: interestRate, amortizationType: KEREN_SHAVA });
                expect(mortgageInfo.monthlyPayment).to.be.closeTo(5930.56, ALLOWED_DIFFERENCE);
                expect(mortgageInfo.totalPaymentToBank).to.be.closeTo(884770.83, ALLOWED_DIFFERENCE);
                expect(mortgageInfo.costOfEachDollar).to.be.closeTo(1.263, 0.001);
                const paymentDetailsPerMonth = mortgageInfo.paymentDetailsPerMonth;

                expect(paymentDetailsPerMonth[0]).to.deep.equal({
                    principal: 3888.89,
                    interest: 2041.67  
                });
                expect(paymentDetailsPerMonth[4]).to.deep.equal({
                    principal: 3888.89,
                    interest: 1996.30
                });
                expect(paymentDetailsPerMonth[13]).to.deep.equal({
                    principal: 3888.89,
                    interest: 1894.21
                });
                expect(paymentDetailsPerMonth[39]).to.deep.equal({
                    principal: 3888.89,
                    interest: 1599.31
                });

            });

            it('should calculate mortgage details for loan amount of 1190000, interest 6.7, 22 years', function() {
                let loanAmount = 1190000;
                let numYears = 22;
                let interestRate = 6.7;

                const mortgageInfo = calculator.getMortgagePartInfo({ loanAmount, numYears, yearlyInterest: interestRate, amortizationType: KEREN_SHAVA });
                expect(mortgageInfo.monthlyPayment).to.be.closeTo(11151.74, ALLOWED_DIFFERENCE);
                expect(mortgageInfo.totalPaymentToBank).to.be.closeTo(2070353, ALLOWED_DIFFERENCE);
                expect(mortgageInfo.costOfEachDollar).to.be.closeTo(1.739, 0.001);

                const paymentDetailsPerMonth = mortgageInfo.paymentDetailsPerMonth;

                expect(paymentDetailsPerMonth[4]).to.deep.equal({
                    principal: 4507.58,
                    interest: 6543.50
                });
                expect(paymentDetailsPerMonth[17]).to.deep.equal({
                    principal: 4507.58,
                    interest: 6216.32
                });
                expect(paymentDetailsPerMonth[25]).to.deep.equal({
                    principal: 4507.58,
                    interest: 6014.98
                });
                expect(paymentDetailsPerMonth[79]).to.deep.equal({
                    principal: 4507.58,
                    interest: 4655.95
                });
            });
        });
    });

    describe('mergeMortgateInfoParts', function() {
        it('should merge multiple parts and calculate the totals', function() {
            const part1 = {
                loanAmount: 1000,
                monthlyPayment: 100,
                totalPaymentToBank: 1500,
                paymentDetailsPerMonth: [
                    {
                        principal: 100,
                        interest: 200
                    },
                    {
                        principal: 150,
                        interest: 150
                    }
                ]
            }

            const part2 = {
                loanAmount: 2000,
                monthlyPayment: 300,
                totalPaymentToBank: 4000,
                paymentDetailsPerMonth: [
                    {
                        principal: 10,
                        interest: 17
                    },
                    {
                        principal: 12,
                        interest: 11
                    }
                ]
            }

            const mergedMortgageInfo = calculator.mergeMortgateInfoParts([part1, part2]);

            expect(mergedMortgageInfo.loanAmount).to.equal(3000);
            expect(mergedMortgageInfo.monthlyPayment).to.equal(400);
            expect(mergedMortgageInfo.totalPaymentToBank).to.equal(5500);
            expect(mergedMortgageInfo.costOfEachDollar).to.be.closeTo(1.833, ALLOWED_DIFFERENCE);
            expect(mergedMortgageInfo.paymentDetailsPerMonth).to.deep.equal([
                {
                    principal: 110,
                    interest: 217
                },
                {
                    principal: 162,
                    interest: 161
                }
            ]);

        });
    });

    describe('loan amount by given monthly payment', function() {
        it('should calculate loan amount for monthly payment of 4350, interest 3.5, 15 years', function() {
            let monthlyPayment = 4350;
            let numYears = 15;
            let interestRate = 3.5;

            const loanAmount = calculator.getLoanAmountByMonthlyPayment({ monthlyPayment, numYears, yearlyInterest: interestRate });
            expect(loanAmount).to.be.closeTo(608492, ALLOWED_DIFFERENCE);
        });

        it('should calculate loan amount for monthly payment of 4000, interest 2.8, 10 years', function() {
            let monthlyPayment = 4000;
            let numYears = 10;
            let interestRate = 2.8;

            const loanAmount = calculator.getLoanAmountByMonthlyPayment({ monthlyPayment, numYears, yearlyInterest: interestRate });
            expect(loanAmount).to.be.closeTo(418234, ALLOWED_DIFFERENCE);
        });
    });

    describe('monthly payment by given loan amount', function() {
        it('should calculate monthlyPayment for loan amount of 700000, interest 3.5, 15 years', function() {
            let loanAmount = 700000;
            let numYears = 15;
            let interestRate = 3.5;

            const monthlyPayment = calculator.getMonthlyPaymentByLoanAmount({ loanAmount, numYears, yearlyInterest: interestRate });
            expect(monthlyPayment).to.be.closeTo(5004, ALLOWED_DIFFERENCE);
        });

        it('should calculate monthlyPayment for loan amount of 1190000, interest 6.7, 22 years', function() {
            let loanAmount = 1190000;
            let numYears = 22;
            let interestRate = 6.7;

            const monthlyPayment = calculator.getMonthlyPaymentByLoanAmount({ loanAmount, numYears, yearlyInterest: interestRate });
            expect(monthlyPayment).to.be.closeTo(8628.21, ALLOWED_DIFFERENCE);
        });
    });

});