import { observable, computed, action } from 'mobx';
import * as Calculator from '../calculator';
import { SHPITZER } from '../consts';
import { generateId } from '../utils';
import _ from 'lodash';

export class MortgagePart {

    @observable id;
    @observable order;
    @observable loanAmount;
    @observable numYears;
    @observable yearlyInterest;
    @observable amortizationType;

    constructor(order) {
        this.id = generateId();
        this.order = order;
    }

    @action init({ loanAmount = 0, numYears = 0, yearlyInterest = 0, amortizationType = SHPITZER } = {}) {
        this.loanAmount = loanAmount;
        this.numYears = numYears;
        this.yearlyInterest = yearlyInterest;
        this.amortizationType = amortizationType;
    }

    @computed get calculatedInfo() {
        return Calculator.getMortgagePartInfo({
            loanAmount: this.loanAmount,
            numYears: this.numYears,
            yearlyInterest: this.yearlyInterest,
            amortizationType: this.amortizationType
        });
    }

    @computed get monthlyPayment() {
        return this.calculatedInfo.monthlyPayment;
    }

    @computed get totalPaymentToBank() {
        return this.calculatedInfo.totalPaymentToBank;
    }

    @computed get costOfEachDollar() {
        return this.calculatedInfo.costOfEachDollar;
    }

    @computed get paymentDetailsPerMonth() {
        return this.calculatedInfo.paymentDetailsPerMonth;
    }

}

export class Mortgage {

    @observable mortgageParts = [];

    @computed get totalCalculatedInfo() {
        const partsCalculatedInfoArray = this.mortgageParts.map(mortgagePart => mortgagePart.calculatedInfo);
        return Calculator.mergeMortgateInfoParts(partsCalculatedInfoArray);
    }

    @computed get loanAmount() {
        return this.totalCalculatedInfo.loanAmount;
    }

    @computed get monthlyPayment() {
        return this.totalCalculatedInfo.monthlyPayment;
    }

    @computed get totalPaymentToBank() {
        return this.totalCalculatedInfo.totalPaymentToBank;
    }

    @computed get costOfEachDollar() {
        return this.totalCalculatedInfo.costOfEachDollar;
    }

    @computed get paymentDetailsPerMonth() {
        return this.totalCalculatedInfo.paymentDetailsPerMonth;
    }

    @computed get orderForNewPart() {
        return this.mortgageParts.length;
    }

    getPart(partId) {
        return _.find(this.mortgageParts, { 'id': partId });
    }

    @action addPart(loanAmount = 0, numYears = 0, yearlyInterest = 0, amortizationType = SHPITZER) {
        const newPart = new MortgagePart(this.orderForNewPart);
        newPart.init(loanAmount, numYears, yearlyInterest, amortizationType);
        this.mortgageParts.push(newPart);
        return newPart.id;
    }

    @action updatePart(mortgagePartId, updatesObject = {}) {
        const mortgagePart = this.getPart(mortgagePartId);
        _.assignIn(mortgagePart, updatesObject);
    }

}

