import React from 'react';
import TopSalesPersons from '../../components/TopSalesPersons/TopSalesPersons';

const salesPersonTables = ({topSalesPersonByRevenue, topSalesPersonBySoldItem}) => {
    return (
        <div className='tables'>
            <TopSalesPersons
              criteria='Revenue' 
              bestRevenueSalesPersons={ topSalesPersonByRevenue } 
            />
          <TopSalesPersons
              criteria='Sold Units'
              mostSellingSalesPersons={ topSalesPersonBySoldItem }
            />
        </div>
    )
}

export default salesPersonTables;