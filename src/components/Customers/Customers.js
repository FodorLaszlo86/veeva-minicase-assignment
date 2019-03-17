import React from 'react';
import './Customers.scss';

const customers = ({ customerStats }) => {
    const tableRows = customerStats.map(customer => 
        <tr key={ `customer-${customer['Account']}`}>
            <td>{ customer['Account'] }</td>
            <td>{ customer['Number of product sold'] }</td>
        </tr>)
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