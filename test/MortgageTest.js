/* eslint-disable */
import { expect } from 'chai';
import * as calculator from '../src/calculator';
import { KEREN_SHAVA, SHPITZER } from '../src/consts';
import { observer } from 'mobx';
import { mortgagesState } from '../src/store/MortgagesStateStore';
import { Mortgage } from '../src/store/Mortgage';

const ALLOWED_DIFFERENCE = 1;

describe('Mortgage tests', function() {

    describe('mortgage parts', function() {
        it('should add mortgage part with zero values by default', function() {
            const mortgage = new Mortgage();

            const newPartId = mortgage.addPart();
            expect(newPartId).not.to.be.empty;
            expect(mortgage.mortgageParts.length).to.equal(1);

            const firstMortgagePart = mortgage.mortgageParts[0];

            expect(firstMortgagePart.id).not.to.be.empty;
            expect(firstMortgagePart.loanAmount).to.equal(0);
            expect(firstMortgagePart.numYears).to.equal(0);
            expect(firstMortgagePart.yearlyInterest).to.equal(0);
            expect(firstMortgagePart.amortizationType).to.equal(SHPITZER);

            expect(mortgage.monthlyPayment).to.equal(0);
            expect(mortgage.totalPaymentToBank).to.equal(0);
            expect(mortgage.costOfEachDollar).to.equal(0);
            expect(mortgage.paymentDetailsPerMonth).to.deep.equal([]);
        });

        it('should add mortgage part with with the values past to the addPart function', function() {
            const mortgage = new Mortgage();

            const newPartId = mortgage.addPart({
                loanAmount: 700000,
                numYears: 15,
                yearlyInterest: 3,
                amortizationType: KEREN_SHAVA
            });

            expect(newPartId).not.to.be.empty;

            expect(mortgage.mortgageParts.length).to.equal(1);

            const firstMortgagePart = mortgage.mortgageParts[0];

            expect(firstMortgagePart.id).not.to.be.empty;
            expect(firstMortgagePart.loanAmount).to.equal(700000);
            expect(firstMortgagePart.numYears).to.equal(15);
            expect(firstMortgagePart.yearlyInterest).to.equal(3);
            expect(firstMortgagePart.amortizationType).to.equal(KEREN_SHAVA);
        });

        it('should set the order of a new mortgage part to be the last part', function() {
            const { mortgage, part1, part2, part3 } = createMortgageWithThreeParts();

            expect(part1.order).to.equal(1);
            expect(part2.order).to.equal(2);
            expect(part3.order).to.equal(3);
        });

        it('should update the part correctly', function() {
            const mortgage = new Mortgage();
            
            const part1Id = mortgage.addPart();
            const part2Id = mortgage.addPart({
                loanAmount: 700000,
                numYears: 15,
                yearlyInterest: 3,
                amortizationType: KEREN_SHAVA
            });

            mortgage.updatePart(part2Id, { loanAmount: 7 });

            // The first part was not updated and so should not change
            const part1 = mortgage.getPart(part1Id);
            expect(part1.loanAmount).to.be.equal(0);
            expect(part1.numYears).to.be.equal(0);

            // The second part should have changed only in what was updated
            const part2 = mortgage.getPart(part2Id);
            expect(part2.loanAmount).to.be.equal(7);
            expect(part2.numYears).to.be.equal(15);

            // The second part should have changed only in what was updated
            mortgage.updatePart(part2Id, { order: 7 });
            expect(part2.loanAmount).to.be.equal(7);
            expect(part2.order).to.be.equal(7);
        });

        it('should delete part correctly', function() {
            const { mortgage, part1, part2, part3 } = createMortgageWithThreeParts();

            expect(mortgage.mortgageParts.length).to.equal(3);
            expect(part1).not.to.be.empty;
            expect(part2).not.to.be.empty;
            expect(part3).not.to.be.empty;

            mortgage.deletePart(part2.id);

            expect(mortgage.mortgageParts.length).to.equal(2);
            expect(mortgage.getPart(part1.id)).not.to.be.empty;
            expect(mortgage.getPart(part2.id)).to.be.empty;
            expect(mortgage.getPart(part3.id)).not.to.be.empty;
        });

        it('should handle order properly even if parts were deleted', function() {
            const { mortgage, part1, part2, part3 } = createMortgageWithThreeParts();

            expect(part2.order).to.be.above(part1.order);
            expect(part3.order).to.be.above(part2.order);

            mortgage.deletePart(part2.id);

            const part4Id = mortgage.addPart();
            const part4 = mortgage.getPart(part4Id);

            expect(part3.order).to.be.above(part1.order);
            expect(part4.order).to.be.above(part3.order);
        });

        it('should handle move part up correctly', function() {
            const { mortgage, part1, part2, part3 } = createMortgageWithThreeParts();

            expect(part3.order).to.be.above(part2.order);
            expect(part2.order).to.be.above(part1.order);

            // moving up the top part should do nothing and not cause an error
            mortgage.movePartUp(part1.id);
            expect(part3.order).to.be.above(part2.order);
            expect(part2.order).to.be.above(part1.order);

            mortgage.movePartUp(part2.id);
            expect(part3.order).to.be.above(part1.order);
            expect(part1.order).to.be.above(part2.order);

            mortgage.movePartUp(part1.id);
            expect(part3.order).to.be.above(part2.order);
            expect(part2.order).to.be.above(part1.order);
        });

        it('should handle move part down correctly', function() {
            const { mortgage, part1, part2, part3 } = createMortgageWithThreeParts();

            expect(part3.order).to.be.above(part2.order);
            expect(part2.order).to.be.above(part1.order);

            // moving down the bottom most part should do nothing and not cause an error
            mortgage.movePartDown(part3.id);
            expect(part3.order).to.be.above(part2.order);
            expect(part2.order).to.be.above(part1.order);

            mortgage.movePartDown(part2.id);
            expect(part2.order).to.be.above(part3.order);
            expect(part3.order).to.be.above(part1.order);

            mortgage.movePartDown(part3.id);
            expect(part3.order).to.be.above(part2.order);
            expect(part2.order).to.be.above(part1.order);
        });

        it('should handle reset mortgage correctly', function() {
            const { mortgage, part1, part2, part3 } = createMortgageWithThreeParts();

            expect(mortgage.mortgageParts.length).to.equal(3);

            mortgage.reset();

            expect(mortgage.mortgageParts.length).to.equal(1);

            const part = mortgage.mortgageParts[0];
            expect(part.id).not.to.be.empty;
            expect(part.loanAmount).to.equal(0);
            expect(part.numYears).to.equal(0);
            expect(part.yearlyInterest).to.equal(0);
            expect(part.amortizationType).to.equal(SHPITZER);
        });

    });

    it('should have zero values by default', function() {
        const mortgage = new Mortgage();
        expect(mortgage.mortgageParts.length).to.equal(0);

        expect(mortgage.monthlyPayment).to.equal(0);
        expect(mortgage.totalPaymentToBank).to.equal(0);
        expect(mortgage.costOfEachDollar).to.equal(0);
        expect(mortgage.paymentDetailsPerMonth).to.deep.equal([]);
    });

    
    it('should calculate mortgage values from the parts correctly', function() {
        const mortgage = new Mortgage();

        mortgage.addPart({
            loanAmount: 700000,
            numYears: 15,
            yearlyInterest: 3,
            amortizationType: KEREN_SHAVA
        });

        expect(mortgage.monthlyPayment).to.be.closeTo(5638, ALLOWED_DIFFERENCE);
        expect(mortgage.totalPaymentToBank).to.be.closeTo(858375, ALLOWED_DIFFERENCE);
        expect(mortgage.costOfEachDollar).to.be.closeTo(1.226, ALLOWED_DIFFERENCE);
        expect(mortgage.paymentDetailsPerMonth.length).to.equal(15*12);

        mortgage.addPart({
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

    function createMortgageWithThreeParts() {
        const mortgage = new Mortgage();
        const part1Id = mortgage.addPart();
        const part2Id = mortgage.addPart();
        const part3Id = mortgage.addPart();

        const part1 = mortgage.getPart(part1Id);
        const part2 = mortgage.getPart(part2Id);
        const part3 = mortgage.getPart(part3Id);

        return {
            mortgage,
            part1,
            part2,
            part3
        }
    }

});