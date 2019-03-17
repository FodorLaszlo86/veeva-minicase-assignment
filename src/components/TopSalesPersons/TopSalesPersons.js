import React from 'react';
import TopSalespersonTmp from './TopSalespersonTmp';

const topSalesPersons = ({ criteria, bestRevenueSalesPersons, mostSellingSalesPersons}) => {
   if(criteria === 'Revenue') {
    return (
        <TopSalespersonTmp 
            criteria={ criteria } 
            salesPersonInfo={ bestRevenueSalesPersons }
        />
    )

   } else {
    return (
        <TopSalespersonTmp
            criteria={ criteria }
            salesPersonInfo={ mostSellingSalesPersons }
        />
    )
   }
}

export default topSalesPersons;