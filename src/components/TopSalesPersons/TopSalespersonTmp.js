import React from 'react';

const topSalespersonTmp = ({ salesPersonInfo, criteria }) => {
    const rowsData = salesPersonInfo.map(salesP => 
                     <tr className='sales-table__row' key={`salesperson-${salesP.salesPerson_Id}`}>
                        <td>{ salesP.salesPerson_Id }</td>
                        <td>{ salesP.salesPerson_name }</td>
                        <td>{ salesP.salesPerson_total_sold_item }</td>
                        <td>{ salesP.salesPerson_total_revenue }</td>
                     </tr> )
    return (
        <table className='sales-table'>
            <caption className='sales-table__caption'>Top 3 salesperson by { criteria }</caption>
            <thead className='sales-table__head'>
                <tr className='sales-table__row'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Total Units Sold</th>
                    <th>Total Revenue</th>
                </tr>
            </thead>
            <tbody className='sales-table__body'>
                { rowsData }
            </tbody>
        </table>
    )
}

export default topSalespersonTmp;