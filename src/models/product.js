'use strict';

module.exports = class Product {
    constructor(SKU, Description, Source, barcodes){
        this.SKU = SKU;
        this.Description = Description;
        this.Source = Source;
        this.barcodes = barcodes;
    }

    /** @return {void} */
    setDescription(Description) {
        // method to set description, if object is created with empty one
        this.Description = Description;
    }

    // method to add barcode
    /** @return {void} */
    addBarcode(barcode) {
        this.barcodes.push(barcode);
    }

    /** @return {bool} */
    isDuplicateOf(product) {
        // method to check if product is duplicate based on provided sku & barcodes 

        // if same sku, then is same product
        if(product.SKU === this.SKU) return true;

        // return true/false if provided barcodes match object barcodes 
        return product.barcodes.some(b => this.barcodes.includes(b));
        
    }
    
}
