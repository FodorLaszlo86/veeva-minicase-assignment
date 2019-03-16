import React, { Component } from 'react';
import { salesData } from './Data/Data';

import './App.css';

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
      }
    }
  }


  componentDidMount = () => {
    this.setState({
      salesPersonStats:this.getSalespersonStats(),
      topSalesPersonByRevenue: this.getTopSalesPersonsByRevenue().slice(0, 3),
      topSalesPersonBySoldItem: this.getTopSalesPersonsBySoldItems().slice(0, 3),
      unitsSoldByMonth: this.getNumberUnitsSoldPerMonth()
    });
    console.log(this.getNumberUnitsSoldPerMonth())
  }
  /*
  generating Stats for SalesPersons
  [
    {
      salesPerson: id,
      name: 'Clarke Bockelman',
      totalSoldItems: 2345,
      totalrevenue: 9856
    }
  ]
  
  */

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
    this.state.orders.map(order => {
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


  render() {

    return (
      <div className="App">
      </div>
    );
  }
}

export default Report;
