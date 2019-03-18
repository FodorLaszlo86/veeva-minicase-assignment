import React from 'react';

const searchBar = ({ searchCustomer }) => (
    <input
        id='searchbar'
         type='text' 
         placeholder='Search customers'
         onChange={  searchCustomer } 
    />
)

export default searchBar;