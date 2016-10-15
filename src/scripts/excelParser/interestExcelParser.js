/*eslint-disable */

const xlsx = require('node-xlsx'); 

const MADAD_SHEET_INDEX = 0;
const LO_TZAMUD_SHEET_INDEX = 1;
const MATACH_SHEET_INDEX = 2;

const ONE_YEAR_ROW = 22;
const TWO_YEARS_ROW = ONE_YEAR_ROW + 1;
const FIVE_YEARS_ROW = ONE_YEAR_ROW + 2;
const TEN_YEARS_ROW = ONE_YEAR_ROW + 3;
const FIFTEEN_YEARS_ROW = ONE_YEAR_ROW + 4;
const TWENTEE_YEARS_ROW = ONE_YEAR_ROW + 5;
const TWENTEE_FIVE_YEARS_ROW = ONE_YEAR_ROW + 6;
const ABOVE_TWENTY_FIVE_YEARS_ROW = ONE_YEAR_ROW + 7;
const PRIME_ROW = ONE_YEAR_ROW + 8;

const CONSTANT_INTEREST_COLUMN_INDEX = 11;
const CHANGING_INTEREST_BASELINE_COLUMN_INDEX = 8;
const CHANGING_INTEREST_ADDITION_COLUMN_INDEX = 7;

const HATZMADA_TYPE = {
    LO_TZAMUD: 'LO_TZAMUD',  
    MADAD: 'MADAD', 
    MATACH: 'MATACH'
}

const INTEREST_TYPE = {
    CHANGING: 'CHANGING',
    CONSTANT: 'CONSTANT'
}

const LOAN_PERIOD_TYPE = {
    ONE_YEAR: 'ONE_YEAR',
    TWO_YEARS: 'TWO_YEARS',
    FIVE_YEARS: 'FIVE_YEARS',
    TEN_YEARS: 'TEN_YEARS',
    FIFTEEN_YEARS: 'FIFTEEN_YEARS',
    TWENTEE_YEARS: 'TWENTEE_YEARS',
    TWENTEE_FIVE_YEARS: 'TWENTEE_FIVE_YEARS',
    ABOVE_TWENTY_FIVE_YEARS: 'ABOVE_TWENTY_FIVE_YEARS'
}

module.exports = {
    parseSheet: sheetFilePath => {
        const worksheetArray = xlsx.parse(sheetFilePath);
        const madadWorksheet = worksheetArray[MADAD_SHEET_INDEX];
        const loTzamudWorksheet = worksheetArray[LO_TZAMUD_SHEET_INDEX];
        const matachWorksheet = worksheetArray[MATACH_SHEET_INDEX];

        const getSheetByHatzmadaType = hatzmadaType => {
            switch(hatzmadaType) {
                case HATZMADA_TYPE.LO_TZAMUD:
                    return loTzamudWorksheet;
                case HATZMADA_TYPE.MADAD:
                    return madadWorksheet;
                case HATZMADA_TYPE.MATACH:
                    return matachWorksheet;
            }
        }

        const retainTwoDecimals = number => number && Number(number.toFixed(2));

        return {
            getConstantInterest: (hatzmadaType, loanPeriodType) => {
                const worksheet = getSheetByHatzmadaType(hatzmadaType);
                const column = CONSTANT_INTEREST_COLUMN_INDEX;

                var row;
                switch(loanPeriodType) {
                    case LOAN_PERIOD_TYPE.ONE_YEAR:
                        row = ONE_YEAR_ROW;
                        break;
                    case LOAN_PERIOD_TYPE.TWO_YEARS:
                        row = TWO_YEARS_ROW;
                        break;
                    case LOAN_PERIOD_TYPE.FIVE_YEARS:
                        row = FIVE_YEARS_ROW;
                        break;
                    case LOAN_PERIOD_TYPE.TEN_YEARS:
                        row = TEN_YEARS_ROW;
                        break;
                    case LOAN_PERIOD_TYPE.FIFTEEN_YEARS:
                        row = FIFTEEN_YEARS_ROW;
                        break;
                    case LOAN_PERIOD_TYPE.TWENTEE_YEARS:
                        row = TWENTEE_YEARS_ROW;
                        break;
                    case LOAN_PERIOD_TYPE.TWENTEE_FIVE_YEARS:
                        row = TWENTEE_FIVE_YEARS_ROW;
                        break;
                    case LOAN_PERIOD_TYPE.ABOVE_TWENTY_FIVE_YEARS:
                        row = ABOVE_TWENTY_FIVE_YEARS_ROW;
                        break;
                }
                const interest = worksheet.data[row][column];
                return retainTwoDecimals(interest);
            },
            getChangingInterest: (hatzmadaType, loanPeriodType) => {
                const worksheet = getSheetByHatzmadaType(hatzmadaType);

                var row;
                switch(loanPeriodType) {
                    case LOAN_PERIOD_TYPE.ONE_YEAR:
                        row = ONE_YEAR_ROW;
                        break;
                    case LOAN_PERIOD_TYPE.FIVE_YEARS:
                        row = FIVE_YEARS_ROW;
                        break;
                    default:
                        row = PRIME_ROW;
                        break;
                }
                const baseLine = retainTwoDecimals(worksheet.data[row][CHANGING_INTEREST_BASELINE_COLUMN_INDEX]);
                const addition = retainTwoDecimals(worksheet.data[row][CHANGING_INTEREST_ADDITION_COLUMN_INDEX]);
                const total = retainTwoDecimals(baseLine + addition);

                if (baseLine === 0 && addition === 0) {
                    return null;
                }
                return {
                    baseLine,
                    addition,
                    total
                }
            }
        }
    },
    HATZMADA_TYPE,
    INTEREST_TYPE,
    LOAN_PERIOD_TYPE
}