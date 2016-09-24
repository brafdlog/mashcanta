
const languageCode = 'he';

const ENGLISH_STRINGS = {
    currencySymbol: '$',
    years: 'Years',
    year: 'Year',
    yearly: 'Yearly',
    monthly: 'Monthly',
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
    delete: 'Delete',
    clearAll: 'Clear all',
    loanCost: 'Loan cost',
    kerenShava: 'kerenShava',
    shpitzer: 'shpitzer',
    paymentsGraph: 'Payment Graph',
    login: 'Login',
    logout: 'Log out',
    showInterest: 'Show interest'
};

const HEBREW_STRINGS = {
    currencySymbol: '₪',
    years: 'שנים',
    year: 'שנה',
    yearly: 'שנתי',
    monthly: 'חודשי',
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
    delete: 'מחק',
    clearAll: 'נקה הכל',
    loanCost: 'עלות ההלואה',
    kerenShava: 'קרן שווה',
    shpitzer: 'שפיצר',
    paymentsGraph: 'גרף תשלומים',
    login: 'התחבר',
    logout: 'התנתק',
    showInterest: 'הצג ריבית'
};

const strings = {
    en: ENGLISH_STRINGS,
    he: HEBREW_STRINGS
};

export default function str(key) {
    const currentLangStrings = strings[languageCode];
    return currentLangStrings[key] || key;
}