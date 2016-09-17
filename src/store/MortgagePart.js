import { observable, computed, action } from 'mobx';
import * as Calculator from '../calculator';
import { SHPITZER } from '../consts';
import { generateId } from '../utils';

export default class MortgagePart {

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

    @action('Init mortgage part') init({ loanAmount = 0, numYears = 0, yearlyInterest = 0, amortizationType = SHPITZER } = {}) {
        this.loanAmount = loanAmount;
        this.numYears = numYears;
        this.yearlyInterest = yearlyInterest;
        this.amortizationType = amortizationType;
    }

    // Returns the representation of the object that will be persisted
    @computed get persistableObject() {
        return {
            id: this.id,
            order: this.order,
            loanAmount: this.loanAmount,
            numYears: this.numYears,
            yearlyInterest: this.yearlyInterest,
            amortizationType: this.amortizationType
        };
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