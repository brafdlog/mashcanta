import React from 'react';
const { shape, oneOf, arrayOf, string, number } = React.PropTypes;

export const KEREN_SHAVA = 'keren shava';
export const SHPITZER = 'shpitzer';
export const BULLET = 'bullet';
export const FACEBOOK = 'facebook';
export const GOOGLE = 'google';

export const STORAGE_PATH_PREFIX = 'https://s3-eu-west-1.amazonaws.com/mashcanta/';
export const CSS = {
    teal: '#2bc8ad',
    tealRGB: 'rgb(43,200,173)',
    purple: '#828ced',
    purpleRGB: 'rgb(130,140,237)',
    fontColor: '#363744',
    red: '#d93434'
};

export const WHOLE_DOLLAR_AMOUT = 'wholeDollarAmount';
export const PERCENT = 'percent';

export const MORTGAGE_SHAPE = shape({
    id: string,
    loanAmount: number,
    monthlyPayment: number,
    averageMonthlyPayment: number,
    totalPaymentToBank: number,
    costOfEachDollar: number,
    paymentDetailsPerMonth: arrayOf(shape({
        principal: number,
        interest: number,
        total: number
    })),
    paymentDetailsPerYearMonthlyAverage: arrayOf(shape({
        principal: number,
        interest: number,
        total: number
    })),
    mortgageParts: arrayOf(shape({
        id: string,
        order: number,
        loanAmount: number,
        numYears: number,
        yearlyInterest: number,
        amortizationType: oneOf([KEREN_SHAVA, SHPITZER, BULLET])
    }))
});