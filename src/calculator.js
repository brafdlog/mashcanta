/* eslint id-length: "off", no-param-reassign: "off" */
import { retainNDecimals } from './utils';

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
    const monthlyInterest = calculateMonthlyInterest(yearlyInterest);
    const paymentDetailsPerMonth = calculatePaymentDetailsPerMonth(loanAmount, numMonths, monthlyPayment, monthlyInterest);

    const totalPaymentToBank = numMonths * monthlyPayment;
    const costOfEachDollar = (totalPaymentToBank / loanAmount) || 0;

    return {
        loanAmount,
        numYears,
        yearlyInterest,
        monthlyPayment,
        totalPaymentToBank,
        costOfEachDollar,
        paymentDetailsPerMonth
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

/*
 * Change the given parameters to parameters that are needed for the calculations
 */
function transformParameters(numYears, yearlyInterest) {
    const monthlyInterest = calculateMonthlyInterest(yearlyInterest);
    const numMonths = numYears * 12;

    const r = 1 / (1 + monthlyInterest);

    return {
        yealyInterestDecimal: yearlyInterest / 100,
        monthlyInterest,
        numMonths,
        r
    };
}

/*
 * For each month calculate how much of that month's payment will be interest and how
 * much will be principal.
 * @returns an array of objects, each looks something like this:
 * {
 *     principal: 1000,
 *     interest: 2000
 * }
 */
function calculatePaymentDetailsPerMonth(loanAmount, numMonths, monthlyPayment, monthlyInterest) {
    const paymentDetailsPerMonth = [];

    let currentLoanAmount = loanAmount;
    for (let i = 0; i < numMonths; i++) {
        const monthlyInterestPayment = currentLoanAmount * monthlyInterest;
        const monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment;
        paymentDetailsPerMonth[i] = {
            principal: retainNDecimals(monthlyPrincipalPayment, 2),
            interest: retainNDecimals(monthlyInterestPayment, 2)
        };
        currentLoanAmount -= monthlyPrincipalPayment;
    }
    return paymentDetailsPerMonth;
}

function calculateMonthlyInterest(yearlyInterest) {
    const yealyInterestDecimal = yearlyInterest / 100;
    const monthlyInterest = yealyInterestDecimal / 12;
    return monthlyInterest;
}