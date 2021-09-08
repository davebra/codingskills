'use strict';

const fs = require('fs');
const path = require('path');
const stringify = require('csv-stringify/lib/sync');

/** @return {string} */
module.exports = (aCompany, outputFolder) => {
    // method to output the CSV from company's array of objects

    // stringify array of objects with using key as column
    const outputCsv = stringify(aCompany, {
        delimiter: ',',
        header: true,
        columns: ['SKU', 'Description', 'Source'],
        record_delimiter: 'windows'
    });

    // create file name with datetime
    let nowDateTime = new Date();
    let outputFileName = `result_${nowDateTime.getFullYear()}-${nowDateTime.getMonth()}-${nowDateTime.getDay()}_${nowDateTime.getHours()}-${nowDateTime.getMinutes()}-${nowDateTime.getSeconds()}.csv`;

    try {
        // write file in output folder
        fs.writeFileSync(path.join(__dirname, '..', '..', outputFolder, outputFileName), outputCsv);
    } catch(err) {
        console.error(err);
    }

    // return filename
    return outputFileName;

}