/*eslint-disable */
const interestParser = require('./interestExcelParser');
const path = require('path');

const HATZMADA_TYPE = interestParser.HATZMADA_TYPE;
const INTEREST_TYPE = interestParser.INTEREST_TYPE;
const LOAN_PERIOD_TYPE = interestParser.LOAN_PERIOD_TYPE;

const filename = process.argv[2];

const sheetPath = filename.startsWith('/') ? filename : path.resolve(__dirname, filename);

const sheet = interestParser.parseSheet(sheetPath);

const moo = getInterestDataByHatzmadaType(HATZMADA_TYPE.LO_TZAMUD)


function getInterestDataByHatzmadaType(hatzmadaType) {
    const getConstantInterest = sheet.getConstantInterest.bind(this, hatzmadaType);
    const getChangingInterest = sheet.getChangingInterest.bind(this, hatzmadaType);
    return {
        constant: {
            1: getConstantInterest(LOAN_PERIOD_TYPE.ONE_YEAR),
            2: getConstantInterest(LOAN_PERIOD_TYPE.TWO_YEARS),
            5: getConstantInterest(LOAN_PERIOD_TYPE.FIVE_YEARS),
            10: getConstantInterest(LOAN_PERIOD_TYPE.TEN_YEARS),
            15: getConstantInterest(LOAN_PERIOD_TYPE.FIFTEEN_YEARS),
            20: getConstantInterest(LOAN_PERIOD_TYPE.TWENTEE_YEARS),
            25: getConstantInterest(LOAN_PERIOD_TYPE.TWENTEE_FIVE_YEARS),
            above25:getConstantInterest(LOAN_PERIOD_TYPE.ABOVE_TWENTY_FIVE_YEARS)
        },
        changing: {
            prime: getChangingInterest(),
            every1Year: getChangingInterest(LOAN_PERIOD_TYPE.ONE_YEAR),
            every5Years: getChangingInterest(LOAN_PERIOD_TYPE.FIVE_YEARS)
        }
    }
}
const ineterestData = {
    madad: getInterestDataByHatzmadaType(HATZMADA_TYPE.MADAD),
    loTzamud: getInterestDataByHatzmadaType(HATZMADA_TYPE.LO_TZAMUD),
    matach: getInterestDataByHatzmadaType(HATZMADA_TYPE.MATACH)
}

console.log(JSON.stringify(ineterestData, null, '  '));
