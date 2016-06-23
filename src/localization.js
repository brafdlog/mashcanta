
const languageCode = 'he';

const ENGLISH_STRINGS = {
    currencySymbol: '$',
    years: 'Years',
    interest: 'Interest',
    loanAmount: 'Loan Amount',
    amount: 'Amount',
    monthlyPayment: 'Monthly payment',
    totalPayment: 'Total Payment',
    costOfDollar: 'Cost Of Dollar',
    add: 'Add',
    clearAll: 'Clear all',
    loanCost: 'Loan cost'
};

const HEBREW_STRINGS = {
    currencySymbol: '₪',
    years: 'שנים',
    interest: 'ריבית',
    loanAmount: 'סכום ההלואה',
    amount: 'סכום',
    monthlyPayment: 'תשלום חודשי',
    totalPayment: 'תשלום סה״כ',
    costOfDollar: 'עלות כל שקל',
    add: 'הוסף',
    clearAll: 'נקה הכל',
    loanCost: 'עלות ההלואה'
};

const strings = {
    en: ENGLISH_STRINGS,
    he: HEBREW_STRINGS
};

export default function str(key) {
    const currentLangStrings = strings[languageCode];
    return currentLangStrings[key] || key;
}