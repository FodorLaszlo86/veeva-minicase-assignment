import React from 'react';

const searchBar = ({ searchCustomer }) => (
    <input
         type='text' 
         placeholder='Search customers'
         onChange={  searchCustomer } 
    />
)

export default searchBar;