/* eslint id-length: "off", no-param-reassign: "off" */

/**
 * Get mortgage info
 * @param  {number} loanAmount            The wanted loan amount
 * @param  {number} numYears              Number of years for returning the mortage
 * @param  {float} yearlyInterest         The yearly interest percent
 * @return {object}                       An object containing data about the mortgage
 */
export function getMortgagePartInfo({ loanAmount = 0, numYears = 0, yearlyInterest = 0 }) {
    const { numMonths } = transformParameters(numYears, yearlyInterest);

    const monthlyPayment = getMonthlyPaymentByLoanAmount({ loanAmount, numYears, yearlyInterest });

    const totalPaymentToBank = numMonths * monthlyPayment;
    const costOfEachDollar = (totalPaymentToBank / loanAmount) || 0;

    return {
        loanAmount,
        monthlyPayment,
        numYears,
        yearlyInterest,
        totalPaymentToBank,
        costOfEachDollar
    };
}

/**
 * Calculate the loan amount that you can get for a given monthly payment.
 * @param  {Number} monthlyPayment The wanted monthly payment
 * @param  {Number} numYears       Number of years for returning the mortage
 * @param  {Number} yearlyInterest The yearly interest percent
 * @return The loan amount
 */
export function getLoanAmountByMonthlyPayment({ monthlyPayment = 0, numYears = 0, yearlyInterest = 0 }) {
    const { numMonths, r } = transformParameters(numYears, yearlyInterest);

    const loanAmount = monthlyPayment * ((r - Math.pow(r, numMonths + 1)) / (1 - r));
    return loanAmount || 0;
}

/**
 * Calculate the monthly payment that you will have to pay to get the given loan amount.
 * @param  {number} loanAmount            The wanted loan amount
 * @param  {number} numYears              Number of years for returning the mortage
 * @param  {float} yearlyInterest         The yearly interest percent
 * @return The monthly payment
 */
export function getMonthlyPaymentByLoanAmount({ loanAmount = 0, numYears = 0, yearlyInterest = 0 }) {
    const { numMonths, r } = transformParameters(numYears, yearlyInterest);

    const monthlyPayment = loanAmount * ((1 - r) / (r - Math.pow(r, numMonths + 1)));
    return monthlyPayment || 0;
}

function transformParameters(numYears, yearlyInterest) {
    const yealyInterestDecimal = yearlyInterest / 100;
    const monthlyInterest = yealyInterestDecimal / 12;
    const numMonths = numYears * 12;

    const r = 1 / (1 + monthlyInterest);

    return {
        yealyInterestDecimal,
        monthlyInterest,
        numMonths,
        r
    };
}