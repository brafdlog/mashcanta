import { observable, computed, action } from 'mobx';
import * as Calculator from '../services/calculator';
import { SHPITZER } from '../consts';
import { generateId, retainNDecimals } from '../utils';
import MortgagePart from './MortgagePart';
import _ from 'lodash';

export default class Mortgage {

    @observable id = generateId();

    // This is not necesarily sorted. Should be accessed only for udpates.
    // Reads should be from the sorted computed mortgageParts
    @observable mortgagePartsInner = [];

    // Returns the representation of the object that will be persisted
    @computed get persistableObject() {
        return {
            id: this.id,
            mortgageParts: this.mortgagePartsInner.map(part => part.persistableObject)
        };
    }

    @computed get hasValidParts() {
        return !!this.mortgageParts.filter(part => part.isValid).length;
    }

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

    @computed get averageMonthlyPayment() {
        // The reason we do the sum calculation manually and don't use totalPaymentToBank is that in Bullet amortization
        // type the monthly payment includes only the interest, not the principal but the totalPaymentToBank includes also
        // the principal and makes the calculation wrong.
        const sum = this.paymentDetailsPerMonth
            .map(paymentDetails => paymentDetails.total)
            .reduce((previousValue, currentValue) => previousValue + currentValue);

        return sum / this.paymentDetailsPerMonth.length;
    }

    @computed get paymentDetailsPerYearMonthlyAverage() {
        let currentYearPaymentDetailsSum;
        let currentYear = -1;
        const paymentDetailsPerYearSum = [];

        this.paymentDetailsPerMonth.forEach((paymentDetails, monthIndex) => {
            if (monthIndex % 12 === 0) {
                if (monthIndex > 0) {
                    paymentDetailsPerYearSum[currentYear] = currentYearPaymentDetailsSum;
                }

                currentYear++;
                currentYearPaymentDetailsSum = {
                    interest: 0,
                    principal: 0,
                    total: 0
                };
            }
            currentYearPaymentDetailsSum.interest += paymentDetails.interest;
            currentYearPaymentDetailsSum.principal += paymentDetails.principal;
            currentYearPaymentDetailsSum.total += paymentDetails.total;
        });

        paymentDetailsPerYearSum[currentYear] = currentYearPaymentDetailsSum;

        const paymentDetailsPerYearAverage = paymentDetailsPerYearSum.map(({ interest, principal, total }) => {
            return {
                interest: retainNDecimals(interest / 12),
                principal: retainNDecimals(principal / 12),
                total: retainNDecimals(total / 12)
            };
        });

        return paymentDetailsPerYearAverage;
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

    @computed get loanCost() {
        return this.totalPaymentToBank - this.loanAmount;
    }

    getPart(partId) {
        return _.find(this.mortgageParts, { 'id': partId });
    }

    @action('Add mortgage part') addPart = (loanAmount = 0, numYears = 0, yearlyInterest = 0, amortizationType = SHPITZER, order) => {
        const newPartOrder = order || this.orderForNewPart;
        const newPart = new MortgagePart(newPartOrder);
        newPart.init(loanAmount, numYears, yearlyInterest, amortizationType);
        this.mortgagePartsInner.push(newPart);
        return newPart.id;
    }

    @action('Update mortgage part') updatePart = (mortgagePartId, updatesObject = {}) => {
        const mortgagePart = this.getPart(mortgagePartId);
        _.assignIn(mortgagePart, updatesObject);
    }

    @action('Delete mortgage part') deletePart = mortgagePartId => {
        _.remove(this.mortgagePartsInner, { id: mortgagePartId });
    }

    @action('Move mortgage part up') movePartUp = partId => {
        const partIndex = _.findIndex(this.mortgageParts, ['id', partId]);
        // If not, this is the top part and moving it up should do nothing
        if (partIndex > 0) {
            const partAboveId = this.mortgageParts[partIndex - 1].id;
            this.swapPartsOrder(partId, partAboveId);
        }
    }

    @action('Move mortgage part down') movePartDown = partId => {
        const partIndex = _.findIndex(this.mortgageParts, ['id', partId]);
        const isLastPart = partIndex === this.mortgageParts.length - 1;
        if (!isLastPart) {
            const partBelowId = this.mortgageParts[partIndex + 1].id;
            this.swapPartsOrder(partId, partBelowId);
        }
    }

    @action('Reset mortgage') reset = () => {
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