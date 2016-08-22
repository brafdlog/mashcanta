
const languageCode = 'he';

const ENGLISH_STRINGS = {
    currencySymbol: '$',
    years: 'Years',
    year: 'Year',
    interest: 'Interest',
    principal: 'Principal',
    loanAmount: 'Loan Amount',
    amount: 'Amount',
    amortizationType: 'AmortizationType',
    monthlyPayment: 'Monthly payment',
    firstPayment: 'First payment',
    totalPayment: 'Total Payment',
    costOfDollar: 'Cost Of Dollar',
    add: 'Add',
    clearAll: 'Clear all',
    loanCost: 'Loan cost',
    kerenShava: 'kerenShava',
    shpitzer: 'shpitzer',
    paymentsGraph: 'Payment Graph'
};

const HEBREW_STRINGS = {
    currencySymbol: '₪',
    years: 'שנים',
    year: 'שנה',
    interest: 'ריבית',
    principal: 'קרן',
    loanAmount: 'סכום ההלואה',
    amount: 'סכום',
    amortizationType: 'שיטת החזר',
    monthlyPayment: 'תשלום חודשי',
    firstPayment: 'תשלום ראשון',
    totalPayment: 'תשלום סה״כ',
    costOfDollar: 'עלות כל שקל',
    add: 'הוסף',
    clearAll: 'נקה הכל',
    loanCost: 'עלות ההלואה',
    kerenShava: 'קרן שווה',
    shpitzer: 'שפיצר',
    paymentsGraph: 'גרף תשלומים'
};

const strings = {
    en: ENGLISH_STRINGS,
    he: HEBREW_STRINGS
};

export default function str(key) {
    const currentLangStrings = strings[languageCode];
    return currentLangStrings[key] || key;
}