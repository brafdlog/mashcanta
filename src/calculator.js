/* eslint id-length: "off", no-param-reassign: "off" */

/**
 * Get mortgage info. Can pass either loan amount or monthly payment, the one not
 * passed will be calculated.
 * @param  {number} loanAmount            The wanted loan amount (optional)
 * @param  {number} monthlyPayment        The wanted monthly payment (optional)
 * @param  {number} numYears              Number of years for returning the mortage
 * @param  {float} yearlyInterest  The yearly interest percent
 * @return {object}                       An object containing data about the mortgage
 */
export function getMortgageInfo({ loanAmount, monthlyPayment, numYears, yearlyInterest }) {
    // The yearlyInterest param will be something like 3.5 and we want to convert it to 0.035
    const yealyInterestDecimal = yearlyInterest / 100;
    const monthlyInterest = yealyInterestDecimal / 12;
    const numMonths = numYears * 12;

    const r = 1 / (1 + monthlyInterest);

    if (!monthlyPayment) {
        monthlyPayment = loanAmount * ((1 - r) / (r - Math.pow(r, numMonths + 1)));
    } else if (!loanAmount) {
        loanAmount = monthlyPayment * ((r - Math.pow(r, numMonths + 1)) / (1 - r));
    }

    const totalPaymentToBank = numMonths * monthlyPayment;
    const costOfEachDollar = totalPaymentToBank / loanAmount;

    return {
        loanAmount,
        monthlyPayment,
        numYears,
        yearlyInterest,
        totalPaymentToBank,
        costOfEachDollar
    };
}