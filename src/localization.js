
const languageCode = 'en';

const ENGLISH_STRINGS = {
    currencySymbol: '$',
    years: 'Years',
    interest: 'Interest',
    loanAmount: 'Loan Amount',
    monthlyPayment: 'Monthly payment',
    totalPayment: 'Total Payment',
    costOfDollar: 'Cost Of Dollar',
    add: 'Add',
    clearAll: 'Clear all'
};

const HEBREW_STRINGS = {
    currencySymbol: '₪',
    years: 'שנים',
    interest: 'ריבית',
    loanAmount: 'סכום',
    monthlyPayment: 'תשלום חודשי',
    totalPayment: 'תשלום סה״כ',
    costOfDollar: 'עלות כל שקל',
    add: 'הוסף',
    clearAll: 'נקה הכל'
};

const strings = {
    en: ENGLISH_STRINGS,
    he: HEBREW_STRINGS
};

export default function str(key) {
    const currentLangStrings = strings[languageCode];
    return currentLangStrings[key] || key;
}