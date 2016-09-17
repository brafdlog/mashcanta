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

    // This is not necesarily sorted. Should be accessed only for udpates.
    // Reads should be from the sorted computed mortgageParts
    @observable mortgagePartsInner = [];

    @computed get mortgageParts() {
        return _.sortBy(this.mortgagePartsInner, 'order');
    }

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
        return this.maxOrder + 1;
    }

    @computed get maxOrder() {
        const partWithMaxOrder = _.maxBy(this.mortgageParts, 'order');
        return partWithMaxOrder ? partWithMaxOrder.order : 0;
    }

    getPart(partId) {
        return _.find(this.mortgageParts, { 'id': partId });
    }

    @action addPart(loanAmount = 0, numYears = 0, yearlyInterest = 0, amortizationType = SHPITZER) {
        const newPart = new MortgagePart(this.orderForNewPart);
        newPart.init(loanAmount, numYears, yearlyInterest, amortizationType);
        this.mortgagePartsInner.push(newPart);
        return newPart.id;
    }

    @action updatePart(mortgagePartId, updatesObject = {}) {
        const mortgagePart = this.getPart(mortgagePartId);
        _.assignIn(mortgagePart, updatesObject);
    }

    @action deletePart(mortgagePartId) {
        _.remove(this.mortgagePartsInner, { id: mortgagePartId });
    }

    @action movePartUp(partId) {
        const partIndex = _.findIndex(this.mortgageParts, ['id', partId]);
        // If not, this is the top part and moving it up should do nothing
        if (partIndex > 0) {
            const partAboveId = this.mortgageParts[partIndex - 1].id;
            this.swapPartsOrder(partId, partAboveId);
        }
    }

    @action movePartDown(partId) {
        const partIndex = _.findIndex(this.mortgageParts, ['id', partId]);
        const isLastPart = partIndex === this.mortgageParts.length - 1;
        if (!isLastPart) {
            const partBelowId = this.mortgageParts[partIndex + 1].id;
            this.swapPartsOrder(partId, partBelowId);
        }
    }

    @action reset() {
        this.mortgagePartsInner.clear();
        this.addPart();
    }

    swapPartsOrder(part1Id, part2Id) {
        const part1 = this.getPart(part1Id);
        const part2 = this.getPart(part2Id);

        const originalPart1 = part1.order;

        part1.order = part2.order;
        part2.order = originalPart1;
    }

}