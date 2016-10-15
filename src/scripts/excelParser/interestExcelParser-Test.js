/* eslint-disable */
const expect = require('chai').expect;
const interestParser = require('./interestExcelParser');
const path = require('path');
const HATZMADA_TYPE = interestParser.HATZMADA_TYPE;
const INTEREST_TYPE = interestParser.INTEREST_TYPE;
const LOAN_PERIOD_TYPE = interestParser.LOAN_PERIOD_TYPE;

const ALLOWED_DIFFERENCE = 0.001;

describe('interest excel file parser', function() {

    var sheet;
    before(() => {
        sheet = interestParser.parseSheet(path.resolve(__dirname,'./dy160131.xlsx'));
    });

    describe('Madad', function() {
        describe('CONSTANT interest', function() {
            it('should get 1 year interest correctly', function() {
                expect(sheet.getConstantInterest(HATZMADA_TYPE.MADAD, LOAN_PERIOD_TYPE.ONE_YEAR)).to.equal(3.25);
            });

            it('should get 2 year interest correctly', function() {
                expect(sheet.getConstantInterest(HATZMADA_TYPE.MADAD, LOAN_PERIOD_TYPE.TWO_YEARS)).to.equal(2.37);
            });

            it('should get 15 years interest correctly', function() {
                expect(sheet.getConstantInterest(HATZMADA_TYPE.MADAD, LOAN_PERIOD_TYPE.FIFTEEN_YEARS)).to.equal(2.55);
            });

            it('should get above 25 years interest correctly', function() {
                expect(sheet.getConstantInterest(HATZMADA_TYPE.MADAD, LOAN_PERIOD_TYPE.ABOVE_TWENTY_FIVE_YEARS)).to.equal(3.19);
            });
        });

        describe('CHANGING interest', function() {
            it('should get changing every 1 year interest correctly', function() {
                const interest = sheet.getChangingInterest(HATZMADA_TYPE.MADAD, LOAN_PERIOD_TYPE.ONE_YEAR);
                expect(interest.baseLine).to.equal(2.00);
                expect(interest.addition).to.equal(1.03);
                expect(interest.total).to.equal(3.03);
            });

            it('should get changing every 5 year interest correctly', function() {
                const interest = sheet.getChangingInterest(HATZMADA_TYPE.MADAD, LOAN_PERIOD_TYPE.FIVE_YEARS);
                expect(interest.baseLine).to.equal(0.75);
                expect(interest.addition).to.equal(1.87);
                expect(interest.total).to.equal(2.62);
            });
        });
        
    });

    describe('Lo Tzamud', function() {
        describe('CONSTANT interest', function() {
            it('should get 1 year interest correctly', function() {
                expect(sheet.getConstantInterest(HATZMADA_TYPE.LO_TZAMUD, LOAN_PERIOD_TYPE.FIVE_YEARS)).to.equal(3.08);
            });

            it('should get 2 year interest correctly', function() {
                expect(sheet.getConstantInterest(HATZMADA_TYPE.LO_TZAMUD, LOAN_PERIOD_TYPE.TEN_YEARS)).to.equal(2.90);
            });

            it('should get 15 years interest correctly', function() {
                expect(sheet.getConstantInterest(HATZMADA_TYPE.LO_TZAMUD, LOAN_PERIOD_TYPE.TWENTEE_YEARS)).to.equal(3.78);
            });

            it('should get above 25 years interest correctly', function() {
                expect(sheet.getConstantInterest(HATZMADA_TYPE.LO_TZAMUD, LOAN_PERIOD_TYPE.ABOVE_TWENTY_FIVE_YEARS)).to.equal(4.15);
            });
        });

        describe('CHANGING interest', function() {
            it('should get prime correctly', function() {
                const interest = sheet.getChangingInterest(HATZMADA_TYPE.LO_TZAMUD);
                expect(interest.baseLine).to.equal(1.61);
                expect(interest.addition).to.equal(-0.49);
                expect(interest.total).to.equal(1.12);
            });

            it('should get changing every 1 year interest correctly', function() {
                const interest = sheet.getChangingInterest(HATZMADA_TYPE.LO_TZAMUD, LOAN_PERIOD_TYPE.ONE_YEAR);
                expect(interest.baseLine).to.equal(1.51);
                expect(interest.addition).to.equal(-0.50);
                expect(interest.total).to.equal(1.01);
            });

            it('should get changing every 5 year interest correctly', function() {
                const interest = sheet.getChangingInterest(HATZMADA_TYPE.LO_TZAMUD, LOAN_PERIOD_TYPE.FIVE_YEARS);
                expect(interest.baseLine).to.equal(1.32);
                expect(interest.addition).to.equal(1.91);
                expect(interest.total).to.equal(3.23);
            });
        });
        
    });

});