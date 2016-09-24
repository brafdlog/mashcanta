
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
    yearlyPayment: 'Yealy payment',
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
    showInterestSeparately: 'Show interest separately',
    total: 'Total',
    changeGraphPeriod: 'Change period on graph'
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
    yearlyPayment: 'תשלום שנתי',
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
    showInterestSeparately: 'הצג ריבית בנפרד',
    total: 'סה״כ',
    changeGraphPeriod: 'שנה את התקופה המוצגת בגרף'
};

const strings = {
    en: ENGLISH_STRINGS,
    he: HEBREW_STRINGS
};

export default function str(key) {
    const currentLangStrings = strings[languageCode];
    return currentLangStrings[key] || key;
}