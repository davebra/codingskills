const Product = require('./product');

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

test('set description to test2', () => {
    prodTestB.setDescription("Test Product 2 to merge")
    expect(prodTestB.Description).toBe("Test Product 2 to merge");
});

test('add barcode to test2', () => {
    prodTestB.addBarcode("test2bar3");
    expect(prodTestB.barcodes).toContain("test2bar3");
});

test('check if test2 is duplicate of test1', () => {
    expect(prodTestA.isDuplicateOf(prodTestB)).toBeFalsy();
});

test('check if test3 is duplicate of test1', () => {
    expect(prodTestA.isDuplicateOf(prodTestC)).toBeTruthy();
});

test('check if test4 is duplicate of test1', () => {
    expect(prodTestA.isDuplicateOf(prodTestD)).toBeTruthy();
});