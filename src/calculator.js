/* eslint id-length: "off" */
export function getLoanAmount(monthlyPayment, numYears, yearlyInterestPercent) {
    // The yearlyInterest param will be something like 3.5 and we want to convert it to 0.035
    const yealyInterestDecimal = yearlyInterestPercent / 100;
    const monthlyInterest = yealyInterestDecimal / 12;
    const numMonths = numYears * 12;

    const r = 1 / (1 + monthlyInterest);
    const loanAmount = monthlyPayment * ((r - Math.pow(r, numMonths + 1)) / (1 - r));
    return loanAmount;
}

export function getMonthlyPayment(loanAmount, numYears, yearlyInterestPercent) {
    // The yearlyInterest param will be something like 3.5 and we want to convert it to 0.035
    const yealyInterestDecimal = yearlyInterestPercent / 100;
    const monthlyInterest = yealyInterestDecimal / 12;
    const numMonths = numYears * 12;

    const r = 1 / (1 + monthlyInterest);
    const monthlyPayment = loanAmount * ((1 - r) / (r - Math.pow(r, numMonths + 1)));
    return monthlyPayment;
}