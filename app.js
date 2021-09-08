const inputCsv = require('./src/services/input');
const merge = require('./src/services/merge');
const outputCsv = require('./src/services/output');

(async () => {

    // customise 
    const inputFolder = './input';
    const outputFolder = './output';

    try {
        // get array of objects of companies products
        let { aCompany, bCompany } = await inputCsv(inputFolder);

        // merge the products
        let mergeResult = await merge(aCompany, bCompany);

        // write the output in output CSV file
        let outputFileName = outputCsv(mergeResult, outputFolder);
        
        // write the filename
        console.log('Merge completed', outputFileName);

    } catch (error) {
        console.error(error);
    }

})();