'use strict';

/** @return {Array} */
module.exports = (aCompany, bCompany) => {

    bCompany.forEach(bProduct => {

        // if product of B company is not a duplicate, add it to A company
        if( !aCompany.some(p => bProduct.isDuplicateOf(p)) ){
            aCompany.push(bProduct);
        }

    })

    return aCompany;

}