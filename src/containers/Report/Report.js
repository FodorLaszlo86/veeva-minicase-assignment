import React, { Component } from 'react';
import { salesData } from '../../Data/Data';
import CompanyLogo from '../../components/CompanyLogo/CompanyLogo';
import Title from '../../components/Title/Title';
import TopSalesPersons from '../../components/TopSalesPersons/TopSalesPersons';
import MonthlySellings from '../../components/MonthlySellings/MonthlySellings';
import Customers from '../../components/Customers/Customers';
import SearchBar from '../../components/SearchBar/SearchBar';


const getSalespersonStats = (products, salesPersons, orders) => {
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

const getTopSalesPersonsByRevenue = () => {
  const topSalesPersonByRevenue = getSalespersonStats(salesData.Products, salesData.Salesperson, salesData.Orders);
  topSalesPersonByRevenue.sort((a, b) => b.salesPerson_total_revenue - a.salesPerson_total_revenue);
  return topSalesPersonByRevenue.slice(0, 3);
}

const getTopSalesPersonsBySoldItems = () => {
  const topSalesPersonBySoldItem = getSalespersonStats(salesData.Products, salesData.Salesperson, salesData.Orders);
  topSalesPersonBySoldItem.sort((a, b) => b.salesPerson_total_sold_item - a.salesPerson_total_sold_item);
  return topSalesPersonBySoldItem.slice(0, 3);
}

const unitsSoldByMonthRaw = {
  '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0,
  '9': 0, '10': 0, '11': 0, '12': 0,
};

const getNumberUnitsSoldPerMonth = () => {
  const unitsByMonth = {...unitsSoldByMonthRaw};
  salesData.Orders.forEach(order => {
    const monthNumeric = new Date(order['Order date']).getMonth() + 1; 
    const amountOfUnits = +order['Number of product sold'];
    unitsByMonth[monthNumeric] += amountOfUnits
  });
  return unitsByMonth;
}

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


class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salesPersons: salesData.Salesperson,
      products: salesData.Products,
      orders: salesData.Orders,
      salesPersonStats: getSalespersonStats(salesData.Products, salesData.Salesperson, salesData.Orders),
      topSalesPersonByRevenue: getTopSalesPersonsByRevenue(),
      topSalesPersonBySoldItem: getTopSalesPersonsBySoldItems(),
      unitsSoldByMonth: unitsSoldByMonthRaw,
      customerStats: getCustomerStats(salesData.Orders),
      searchFor: ''
    }
  }

  componentDidMount = () => {
      this.setState({
        unitsSoldByMonth: getNumberUnitsSoldPerMonth()
      })
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
        <SearchBar searchCustomer={ this.getSearchInput.bind(this) } />
        <Customers customerStats={ this.state.customerStats } />
      </div>
    );
  }
}

export default Report;
