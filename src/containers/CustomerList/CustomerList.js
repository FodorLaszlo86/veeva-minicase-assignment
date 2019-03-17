import React, { Component } from 'react';
import { salesData } from '../../Data/Data';
import SearchBar from '../../components/SearchBar/SearchBar';
import Customers from '../../components/Customers/Customers';

const getCustomerStats = (orders) => {
    const customers = [];
    orders.forEach(order => {
      const data = {
            'Account': order['Account'],
            'Number of product sold': Number(order['Number of product sold'])
      }
      if(!customers.find(name => name['Account'] === order['Account'])) {
        customers.push(data)
      } else {
        const customerIdx = customers.findIndex(name => name['Account'] === order['Account']);
        customers[customerIdx]['Number of product sold'] += Number(order['Number of product sold']);
      }
    })
    return customers; 
  }

class CustomerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerStats: getCustomerStats(salesData.Orders),
            searchFor: ''
        }
    }

    getSearchInput = (e) => {
        this.setState({
          searchFor: e.target.value
        })
      }
    
    searchCustomer = () => {
    
    }

    render() {
        return (
            <div>
                <SearchBar searchCustomer={ this.getSearchInput } />
                <Customers customerStats={ this.state.customerStats } />
            </div>
        )
    }
}

export default CustomerList;