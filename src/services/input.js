'use strict';

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');

const Product = require('../models/product');

/** @return {Array} */
const parseCsvFile = (csvInput) => {
    // promise function to read the CSVs and return an array[row[]]
    return new Promise((resolve, reject) => {
        let records = [];
        parse(csvInput, {columns: true, delimiter: ','})
            .on('error', (err) => {reject(err)})
            .on('readable', function() {
                let record;
                while (record = this.read()) {
                    records.push(record);
                }
            })
            .on('end', () => { resolve(records) });
    })
}

/** @return {Object<Object>} */
module.exports = (inputFolder) => {
    // function to import to populate companies product objects with CSVs content

    return new Promise(async (resolve, reject) => {
        
        let aCompany = {},
            bCompany = {};
        
        // expected files
        let expectedFiles = ["catalogA", "catalogB", "barcodesA", "barcodesB"];

        // get all file names in input folder
        const inputFiles = fs.readdirSync(path.join(__dirname, '..', '..', inputFolder), []);

        // iterate '.csv' files in the folder (filter files that don't ends with .csv or .CSV)
        for ( const file of inputFiles.filter(f => f.toLocaleLowerCase().endsWith('.csv')))  {

            let fileContent;
            let fileCsv;

            try {
                // read file content
                fileContent = fs.readFileSync(path.join(__dirname, '..', '..', inputFolder, file), "utf-8");
                // parse CSV
                fileCsv = await parseCsvFile(fileContent);
            } catch (error) {
                reject(error);
            }

            // remove '.csv' from filename
            let filename = file.substr(0, file.length-4);

            switch (filename) {

                case "catalogA":
                    expectedFiles[0] = false;

                    fileCsv.forEach(row => {
                        if(typeof aCompany[row.SKU] === "undefined"){
                            // product undefined, create new
                            aCompany[row.SKU] = new Product(row.SKU, row.Description, 'A', []);
                        } else {
                            // product already defined by "barcodes", add description
                            aCompany[row.SKU].setDescription(row.Description);
                        }
                    });
                    
                    break;

                case "catalogB":
                    expectedFiles[1] = false;

                    fileCsv.forEach(row => {
                        if(typeof bCompany[row.SKU] === "undefined"){
                            // product undefined, create new
                            bCompany[row.SKU] = new Product(row.SKU, row.Description, 'B', []);
                        } else {
                            // product already defined by "barcodes", add description
                            bCompany[row.SKU].setDescription(row.Description);
                        }
                    });
                    
                    break;

                case "barcodesA":
                    expectedFiles[2] = false;

                    fileCsv.forEach(row => {
                        if(typeof aCompany[row.SKU] === "undefined"){
                            // product undefined, create new
                            aCompany[row.SKU] = new Product(row.SKU, '', 'A', [row.Barcode]);
                        } else {
                            // product already defined by "catalog" or "barcodes", add barcode
                            aCompany[row.SKU].addBarcode(row.Barcode);
                        }
                    });
                    
                    break;

                case "barcodesB":
                    expectedFiles[3] = false;

                    fileCsv.forEach(row => {
                        if(typeof bCompany[row.SKU] === "undefined"){
                            // product undefined, create new
                            bCompany[row.SKU] = new Product(row.SKU, '', 'B', [row.Barcode]);
                        } else {
                            // product already defined by "catalog" or "barcodes", add barcode
                            bCompany[row.SKU].addBarcode(row.Barcode);
                        }
                    });
                    
                    break;

                default:
                    // suppliers files are not needed for the process
                    continue;
            }

        }

        // if one or more expected files are missing, reject the execution and throw an error with files missing
        let checkMissingFiles = expectedFiles.filter(f => f !== false);

        if(checkMissingFiles.length > 0){
            reject('Missing required files: ' + checkMissingFiles.join(", "));
        } else {

            // return companies product objects, as array of objects (remove keys) 
            resolve({
                aCompany: Object.values(aCompany),
                bCompany: Object.values(bCompany)
            })
        }
    })

}