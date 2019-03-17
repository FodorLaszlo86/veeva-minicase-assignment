import React from 'react';

const topSalespersonTmp = ({ salesPersonInfo, criteria }) => {
    const rowsData = salesPersonInfo.map(salesP => 
                     <tr key={`salesperson-${salesP.salesPerson_Id}`}>
                        <td>{ salesP.salesPerson_Id }</td>
                        <td>{ salesP.salesPerson_name }</td>
                        <td>{ salesP.salesPerson_total_sold_item }</td>
                        <td>{ salesP.salesPerson_total_revenue }</td>
                     </tr> )
    return (
        <table>
            <caption>Top performing salesperson by { criteria }</caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Total Units Sold</th>
                    <th>Total Revenue</th>
                </tr>
            </thead>
            <tbody>
                { rowsData }
            </tbody>
        </table>
    )
}

export default topSalespersonTmp;