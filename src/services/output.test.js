const outputCsv = require('./output');
const fs = require('fs');
const path = require('path');

test('test output array of ojects to CSV', () => {
    let aCompany = [
        {
            SKU: "test1", 
            Description: "Test Product 1", 
            Source: "A", 
            barcodes: ["test1bar1", "test1bar2", "test1bar3"]
        },
        {
            SKU: "test2", 
            Description: "Test Product 2 to merge", 
            Source: "B", 
            barcodes: ["test2bar1", "test2bar2", "test2bar3"]
        }
    ]

    let testExport = outputCsv(aCompany, './outputTest');

    let readTestExport = fs.readFileSync(path.join(__dirname, '..', '..', './outputTest', testExport), "utf-8");

    let readExpected = fs.readFileSync(path.join(__dirname, '..', '..', './outputTest', 'result_output.csv'), "utf-8");

    expect(readTestExport).toEqual(readExpected);
});
