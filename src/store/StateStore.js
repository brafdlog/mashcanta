import { observable, useStrict, action } from 'mobx';
import Mortgage from './Mortgage';
useStrict(true);

class StateStore {
    @observable mortgages = [new Mortgage()];
    @observable isLoading = false;

    /**
     * The mortages we get here are not observable objects that mobx knows,
     * So we first create from them observable objects and then set them
     * to the state store.
     */
    @action setMortgages(mortgages) {
        const observableMortgages = mortgages.map(mortgage => {
            const observableMortgage = new Mortgage(mortgage.id);
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