import React from 'react';
import './Customers.scss';

const customers = ({ customerStats }) => {
    let tableRows;
    if(customerStats.length > 0) {
        tableRows = customerStats.map(customer => 
            <tr key={ `customer-${customer['Account']}`}>
                <td>{ customer['Account'] }</td>
                <td>{ customer['Number of product sold'] }</td>
            </tr>)
    } else {
        tableRows = <tr>
            <td>No Users Found...</td>
        </tr>
    }
    
    return (
        <table>
            <thead>
                <tr className='fixed-table-head'>
                    <th>Customer Name</th>
                    <th>Total Units Purchased</th>
                </tr>
            </thead>
            <tbody className='scroll-table'>
                { tableRows }
            </tbody>
        </table>
    )
}

export default customers;