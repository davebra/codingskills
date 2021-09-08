const inputCsv = require('./input');
const Product = require('../models/product');

test('test input folder of CSVs', async () => {
    let aCompany = [
        new Product(
            "test1", 
            "Test Product 1", 
            "A", 
            ["test1bar1", "test1bar2", "test1bar3"]
        )
    ]
    let bCompany = [
        new Product(
            "test2", 
            "Test Product 2 to merge", 
            "B", 
            ["test2bar1", "test2bar2", "test2bar3"]
        ),
        new Product(
            "test1", 
            "Test Product 3 same sku as test1", 
            "B", 
            ["test3bar1", "test3bar2", "test3bar3"]
        ),
        new Product(
            "test4", 
            "Test Product 4 same barcode as test1", 
            "B", 
            ["test4bar1", "test1bar2", "test4bar3"]
        )
    ]

    const data = await inputCsv('./inputTest');
    expect(data).toEqual({aCompany, bCompany});
});
