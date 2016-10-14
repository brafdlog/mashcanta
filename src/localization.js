import _ from 'lodash';

const languageCode = 'he';

const ENGLISH_STRINGS = {
    currencySymbol: '$',
    years: 'Years',
    year: 'Year',
    yearly: 'Yearly',
    monthly: 'Monthly',
    interest: 'Interest',
    principal: 'Principal',
    maslul: 'loan type',
    loanAmount: 'Loan Amount',
    amount: 'Amount',
    amortizationType: 'AmortizationType',
    monthlyPayment: 'Monthly payment',
    averageMonthlyPayment: 'Average monthly payment',
    firstPayment: 'First payment',
    totalPayment: 'Total Payment',
    costOfDollar: 'Cost Of Dollar',
    addPart: 'Add',
    delete: 'Delete',
    clearAll: 'Clear all',
    loanCost: 'Loan cost',
    kerenShava: 'kerenShava',
    shpitzer: 'shpitzer',
    bullet: 'bullet',
    paymentsGraph: 'Payment Graph',
    paymentsTable: 'Payment Table',
    login: 'Login',
    logout: 'Log out',
    showInterestSeparately: 'Show interest separately',
    total: 'Total',
    changeGraphPeriod: 'Change period on graph',
    payment: 'Payment',
    months: 'Months',
    loginModalText: 'Login to save your mortgage data',
    month: 'Month',
    noDataToDisplay: 'No data to display',
    validationErrors: {
        wholeNumber: 'Should be a whole number',
        numberRange: (min, max) => `Should be between ${min} and ${max}`,
        lessThan: max => `Should be less than ${max}`,
        greaterThan: min => `Should be greater than ${min}`,
        number: 'Should be a number'
    }
};

const HEBREW_STRINGS = {
    currencySymbol: '₪',
    years: 'שנים',
    year: 'שנה',
    yearly: 'שנתי',
    monthly: 'חודשי',
    interest: 'ריבית',
    principal: 'קרן',
    maslul: 'מסלול',
    loanAmount: 'סכום ההלוואה',
    amount: 'סכום',
    amortizationType: 'שיטת החזר',
    monthlyPayment: 'תשלום חודשי',
    averageMonthlyPayment: 'תשלום חודשי ממוצע',
    firstPayment: 'תשלום ראשון',
    totalPayment: 'תשלום סה״כ',
    costOfDollar: 'עלות כל שקל',
    addPart: 'הוסף מסלול',
    delete: 'מחק',
    clearAll: 'נקה הכל',
    loanCost: 'עלות ההלוואה',
    kerenShava: 'קרן שווה',
    shpitzer: 'שפיצר',
    bullet: 'בוליט',
    paymentsGraph: 'גרף תשלומים',
    paymentsTable: 'טבלת תשלומים',
    login: 'התחבר',
    logout: 'התנתק',
    showInterestSeparately: 'הצג ריבית בנפרד',
    total: 'סה״כ',
    changeGraphPeriod: 'שנה את התקופה המוצגת בגרף',
    payment: 'תשלום',
    months: 'חודשים',
    loginModalText: 'התחבר/י כדי לשמור את המידע שלך',
    month: 'חודש',
    noDataToDisplay: 'אין מידע להצגה',
    validationErrors: {
        wholeNumber: 'צריך להיות מספר שלם',
        numberRange: (min, max) => `הערך צריך להיות בין ${min} ל${max}`,
        lessThan: max => `צריך להיות קטן מ ${max}`,
        greaterThan: min => `צריך להיות גדול מ ${min}`,
        number: 'צריך להיות מספר'
    }
};

const strings = {
    en: ENGLISH_STRINGS,
    he: HEBREW_STRINGS
};

export default function str(key) {
    const currentLangStrings = strings[languageCode];
    return _.get(currentLangStrings, key) || key;
}