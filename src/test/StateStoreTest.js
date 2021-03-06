/* eslint-disable */
import { expect } from 'chai';
import * as calculator from '../services/calculator';
import { KEREN_SHAVA, SHPITZER } from '../consts';
import { observer, useStrict } from 'mobx';
import { stateStore, BEFORE_AUTH, ANONYMOUS, USER_LOGGED_IN } from '../store/StateStore';
import Mortgage from '../store/Mortgage';
useStrict(false);

describe('State store', function() { 
    it('should initially have one empty mortgage', function() {
        const mortgages = stateStore.mortgages;
        expect(mortgages.length).to.equal(1);

        const initialMortgage = mortgages[0];
        expect(initialMortgage.mortgageParts.length).to.equal(1);
        expect(initialMortgage.loanAmount).to.equal(0);
        expect(initialMortgage.monthlyPayment).to.equal(0);
        expect(initialMortgage.totalPaymentToBank).to.equal(0);
        expect(initialMortgage.costOfEachDollar).to.equal(0);
        expect(initialMortgage.paymentDetailsPerMonth).to.deep.equal([]);
    });

    it('should set mortgages', function() {

        const mortgagesToSet = [{
            "mortgageParts": [
                {
                    "id": "chHZUGV",
                    "loanAmount": 50000,
                    "numYears": 2,
                    "order": 1,
                    "yearlyInterest": 6
                },
                {
                    "amortizationType": "shpitzer",
                    "id": "SHWhv2p",
                    "loanAmount": 700000,
                    "numYears": 1,
                    "order": 2,
                    "yearlyInterest": 3
                }
            ]
        },
        {
            "mortgageParts": [
                {
                    "id": "ArbsdfV",
                    "loanAmount": 260000,
                    "numYears": 25,
                    "order": 1,
                    "yearlyInterest": 4
                }
            ]
        }];

        let mortgages = stateStore.mortgages;
        expect(mortgages.length).to.equal(1);

        const initialMortgage = mortgages[0];
        const initialMortgageId = initialMortgage.id;

        stateStore.setMortgages(mortgagesToSet);

        expect(stateStore.fetchedUserDataFromDb).to.be.true;

        mortgages = stateStore.mortgages;
        const mortgageIds = mortgages.map(mortgage => mortgage.id);

        expect(mortgages.length).to.equal(2);
        // Calling set mortgages should have overriden the original mortgages
        expect(mortgageIds).not.to.contain(initialMortgageId);

        const mortgage1 = mortgages[0];
        const mortgage2 = mortgages[1];

        // This is to verify that after setting the mortgages the calculated fields are calculated as expected
        expect(mortgage1.loanAmount).to.equal(750000);
        expect(mortgage2.loanAmount).to.equal(260000);
    });
    
    it('should set and fetch current mortgage correctly', function() {
        const mortgage1 = new Mortgage();
        const mortgage2 = new Mortgage();
        stateStore.setMortgages([mortgage1, mortgage2]);

        expect(stateStore.currentMortgage.id).to.be.equal(mortgage1.id);
        stateStore.setCurrentMortgageId(mortgage2.id);
        expect(stateStore.currentMortgage.id).to.be.equal(mortgage2.id);
        stateStore.setCurrentMortgageId(mortgage1.id);
        expect(stateStore.currentMortgage.id).to.be.equal(mortgage1.id);
    });

    it('should set and fetch current mortgage correctly', function() {
        const mortgage1 = new Mortgage();
        const mortgage2 = new Mortgage();
        stateStore.setMortgages([mortgage1, mortgage2]);

        expect(stateStore.mortgages.length).to.be.equal(2);
        
        const newMortgageId = stateStore.createNewMortgage();

        expect(stateStore.mortgages.length).to.be.equal(3);

        expect(stateStore.mortgages.map(mortgage => mortgage.id)).to.contain(newMortgageId);
    });

    it('should set user correctly', function() {
        expect(stateStore.user).not.to.be.ok;

        const user = {
            id: 7,
            name: 'Moshe Ufnik',
            email: 'moshe@ufnik.com',
            imageUrl: 'http://moo.jpg'
        };

        stateStore.setLoggedInUser(user);

        expect(stateStore.user).to.deep.equal(user);
    });

    it('should return correct user status', function() {
        stateStore.user = undefined;
        expect(stateStore.userStatus).to.equal(BEFORE_AUTH);

        const user = {
            id: 7,
            name: 'Moshe Ufnik',
            email: 'moshe@ufnik.com'
        };

        stateStore.setLoggedInUser(user);
        expect(stateStore.userStatus).to.equal(USER_LOGGED_IN);

        stateStore.setLoggedOut();
        expect(stateStore.userStatus).to.equal(ANONYMOUS);
    });

    it('should set logout correctly', function() {

        const user = {
            id: 7,
            name: 'Moshe Ufnik',
            email: 'moshe@ufnik.com'
        };

        stateStore.setLoggedInUser(user);

        stateStore.setLoggedOut();
        expect(stateStore.userStatus).to.equal(ANONYMOUS);

        expect(stateStore.user).to.be.null;
        expect(stateStore.fetchedUserDataFromDb).to.be.false;
    });

});