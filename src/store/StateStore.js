import { observable, useStrict, action, computed } from 'mobx';
import Mortgage from './Mortgage';
import _ from 'lodash';
useStrict(true);

class StateStore {
    @observable mortgages = [new Mortgage()];
    @observable isLoading = false;
    @observable currentMortgageId;

    @computed get currentMortgage() {
        return this.currentMortgageId ? _.find(this.mortgages, { id: this.currentMortgageId }) : this.mortgages[0];
    }

    @action setCurrentMortgageId(mortgageId) {
        this.currentMortgageId = mortgageId;
    }

    /**
     * The mortages we get here are not observable objects that mobx knows,
     * So we first create from them observable objects and then set them
     * to the state store.
     */
    @action setMortgages(mortgages) {
        if (!mortgages || !mortgages[0]) {
            return;
        }
        const observableMortgages = mortgages.map(mortgage => {
            const observableMortgage = new Mortgage();
            observableMortgage.id = mortgage.id;
            mortgage.mortgageParts.forEach(part => {
                observableMortgage.addPart({
                    loanAmount: part.loanAmount,
                    numYears: part.numYears,
                    yearlyInterest: part.yearlyInterest,
                    amortizationType: part.amortizationType,
                    order: part.order
                });
            });
            return observableMortgage;
        });
        this.mortgages.replace(observableMortgages);
    }

    @action('Set loading') setLoading(isLoading) {
        this.isLoading = isLoading;
    }
}

export const stateStore = new StateStore();