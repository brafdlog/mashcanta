/* eslint id-length: "off", no-param-reassign: "off" */
import { retainNDecimals } from './utils';
import { SHPITZER } from './consts';

/**
 * Get mortgage info
 * @param  {number} loanAmount            The wanted loan amount
 * @param  {number} numYears              Number of years for returning the mortage
 * @param  {float} yearlyInterest         The yearly interest percent
 * @return {object}                       An object containing data about the mortgage
 */
export function getMortgagePartInfo({ loanAmount = 0, numYears = 0, yearlyInterest = 0, amortizationType = SHPITZER }) {
    const paymentDetailsPerMonth = calculatePaymentDetailsPerMonth(loanAmount, numYears, yearlyInterest, amortizationType);

    let totalPaymentToBank = 0;
    let monthlyPayment = 0;

    // The if will be false when there are no mortgage parts. In that case we just want to return zero values
    if (paymentDetailsPerMonth && paymentDetailsPerMonth.length) {
        totalPaymentToBank = paymentDetailsPerMonth
        .map(monthPay => monthPay.principal + monthPay.interest)
        .reduce((sum, monthPayment) => sum + monthPayment);

        // for shpitzer this will be same monthly payment always and for keren shava this will the be the first month's payment
        monthlyPayment = paymentDetailsPerMonth[0].interest + paymentDetailsPerMonth[0].principal;
    }

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

/**
 * Gets the calculated info of mortgage parts and merges them to get the totals
 * for the whole mortgage
 * @param  an array of calculated mortgage parts info elements
 */
export function mergeMortgateInfoParts(calculatedMortgageInfoParts) {
    let paymentDetailsPerMonth = [];
    let loanAmount = 0;
    let monthlyPayment = 0;
    let totalPaymentToBank = 0;

    calculatedMortgageInfoParts.forEach(mortgagePart => {
        loanAmount += mortgagePart.loanAmount;
        monthlyPayment += mortgagePart.monthlyPayment;
        totalPaymentToBank += mortgagePart.totalPaymentToBank;

        // merge the paymentDetailsPerMonth
        paymentDetailsPerMonth = mortgagePart.paymentDetailsPerMonth.map((monthPaymentDetails, monthIndex) => {
            if (!paymentDetailsPerMonth[monthIndex]) {
                paymentDetailsPerMonth[monthIndex] = {
                    principal: 0,
                    interest: 0
                };
            }
            const sum = {
                principal: monthPaymentDetails.principal + paymentDetailsPerMonth[monthIndex].principal,
                interest: monthPaymentDetails.interest + paymentDetailsPerMonth[monthIndex].interest
            };
            return sum;
        });
    });

    const costOfEachDollar = totalPaymentToBank / loanAmount;

    return {
        loanAmount,
        monthlyPayment,
        totalPaymentToBank,
        costOfEachDollar,
        paymentDetailsPerMonth
    };
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
function calculatePaymentDetailsPerMonth(loanAmount, numYears, yearlyInterest, amortizationType) {
    const { numMonths } = transformParameters(numYears, yearlyInterest);
    const monthlyInterest = calculateMonthlyInterest(yearlyInterest);

    const paymentDetailsPerMonth = [];

    let currentLoanAmount = loanAmount;
    for (let i = 0; i < numMonths; i++) {
        const monthlyInterestPayment = currentLoanAmount * monthlyInterest;
        let monthlyPrincipalPayment;
        if (amortizationType === SHPITZER) {
            const monthlyPayment = getMonthlyPaymentByLoanAmount({ loanAmount, numYears, yearlyInterest });
            monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment;
        } else {
            monthlyPrincipalPayment = loanAmount / numMonths;
        }

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