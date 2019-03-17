import React, { Component } from 'react';
import { salesData } from '../../Data/Data';
import CompanyLogo from '../../components/CompanyLogo/CompanyLogo';
import Title from '../../components/Title/Title';
import TopSalesPersons from '../../components/TopSalesPersons/TopSalesPersons';
import MonthlySellings from '../../components/MonthlySellings/MonthlySellings';
import Customers from '../../components/Customers/Customers';
import SearchBar from '../../components/SearchBar/SearchBar';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salesPersons: salesData.Salesperson,
      products: salesData.Products,
      orders: salesData.Orders,
      salesPersonStats: [],
      topSalesPersonByRevenue: [],
      topSalesPersonBySoldItem: [],
      unitsSoldByMonth: {
        '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0,
        '9': 0, '10': 0, '11': 0, '12': 0,
      },
      customerStats: [],
      searchFor: ''
    }
  }


  componentDidMount = () => {
    this.setState({
      salesPersonStats:this.getSalespersonStats(),
      topSalesPersonByRevenue: this.getTopSalesPersonsByRevenue().slice(0, 3),
      topSalesPersonBySoldItem: this.getTopSalesPersonsBySoldItems().slice(0, 3),
      unitsSoldByMonth: this.getNumberUnitsSoldPerMonth(),
      customerStats: this.getCustomerStats()
    });
  }

  getSalespersonStats = () => {
    const { products, salesPersons, orders } = this.state;
    
    const salesPersonStats = salesPersons.map(person => {
      const salesPersonOrders = orders.filter(order => order['Salesperson ID'] === person.Id);
      const totalSoldItem = salesPersonOrders.reduce((acc, item) => acc + +item['Number of product sold'], 0);
      const salespersonName = person.Name;
      const revenue = salesPersonOrders.map((item) => [item['Product Id'], item['Number of product sold']])
                                       .map(product => {
                                         product[0] = products.find(id => id['Product Id'] === product[0])['Unit price'];
                                         return +product[0] * +product[1]
                                        })
                                       .reduce((acc, b) => acc + b, 0)
                                    
      return {
        salesPerson_Id: person.Id, 
        salesPerson_name: salespersonName,
        salesPerson_total_sold_item: totalSoldItem,
        salesPerson_total_revenue: revenue
    }
    });
    return salesPersonStats;
  }

  getNumberUnitsSoldPerMonth = () => {
    const unitsByMonth = {...this.state.unitsSoldByMonth}
    this.state.orders.forEach(order => {
      const monthNumeric = new Date(order['Order date']).getMonth() + 1; 
      const amountOfUnits = +order['Number of product sold'];
      unitsByMonth[monthNumeric] += amountOfUnits
    });
    return unitsByMonth;
  }

  getTopSalesPersonsByRevenue = () => {
    const topSalesPersonByRevenue = this.getSalespersonStats();
    topSalesPersonByRevenue.sort((a, b) => b.salesPerson_total_revenue - a.salesPerson_total_revenue);
    return topSalesPersonByRevenue;
  }

  getTopSalesPersonsBySoldItems = () => {
    const topSalesPersonBySoldItem = this.getSalespersonStats();
    topSalesPersonBySoldItem.sort((a, b) => b.salesPerson_total_sold_item - a.salesPerson_total_sold_item);
    return topSalesPersonBySoldItem;
  }

  /*
  Customer_Name | Purchased_units | total_amount
  
  */

  getCustomerStats = () => {
    const customers = [];
    this.state.orders.forEach(order => {
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

  getSearchInput = (e) => {
    this.setState({
      searchFor: e.target.value
    })
  }

  searchCustomer = () => {

  }


  render() {

    return (
      <div className="App">
        <CompanyLogo />
        <Title />
        <TopSalesPersons
            criteria='Revenue' 
            bestRevenueSalesPersons={ this.state.topSalesPersonByRevenue } 
          />
        <TopSalesPersons
            criteria='Sold Units'
            mostSellingSalesPersons={ this.state.topSalesPersonBySoldItem }
          />
        <MonthlySellings 
            sellingByMonth={ this.state.unitsSoldByMonth } 
        /> 
        <SearchBar searchCustomer={ this.getSearchInput } />
        <Customers customerStats={ this.state.customerStats } />
      </div>
    );
  }
}

export default Report;
