const merge = require('./merge');
const Product = require('../models/product');

let prodTestA = new Product(
    "test1", 
    "Test Product 1", 
    "A", 
    ["test1bar1", "test1bar2", "test1bar3"]
);

let prodTestB = new Product(
    "test2", 
    "", 
    "B", 
    ["test2bar1", "test2bar2"]
);

let prodTestC = new Product(
    "test1", 
    "Test Product 3 same sku as test1", 
    "B", 
    ["test3bar1", "test3bar2", "test3bar3"]
);

let prodTestD = new Product(
    "test4", 
    "Test Product 4 same barcode as test1", 
    "B", 
    ["test4bar1", "test1bar2", "test4bar3"]
);

let aCompany = [prodTestA];
let bCompany = [prodTestB,prodTestC,prodTestD];

test('test merge products', () => {
    let expectedMerge = [
        {
            SKU: "test1", 
            Description: "Test Product 1", 
            Source: "A", 
            barcodes: ["test1bar1", "test1bar2", "test1bar3"]
        },
        {
            SKU: "test2", 
            Description: "", 
            Source: "B", 
            barcodes: ["test2bar1", "test2bar2"]
        }
    ]
    expect(merge(aCompany,bCompany)).toEqual(expectedMerge);
});
