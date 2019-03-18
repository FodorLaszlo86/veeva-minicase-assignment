import React, { Component } from 'react';
import { salesData } from '../../Data/Data';
import Header from '../Header/Header';
import SalesPersonTables from '../../containers/SalesPersonTables/SalesPersonTables';
import MonthlySellings from '../../components/MonthlySellings/MonthlySellings';
import CustomerList from '../CustomerList/CustomerList';
import Footer from '../../components/Footer/Footer';



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
    }
  }

  componentDidMount = () => {
      this.setState({
        unitsSoldByMonth: getNumberUnitsSoldPerMonth()
      })
  }

  render() {
    const { topSalesPersonByRevenue, 
            topSalesPersonBySoldItem, 
            unitsSoldByMonth } = this.state;
    return (
      <div className="App">
        <Header />
        <SalesPersonTables 
            topSalesPersonByRevenue={ topSalesPersonByRevenue }
            topSalesPersonBySoldItem={ topSalesPersonBySoldItem }
        />
        <div className='field'>
          <MonthlySellings 
              sellingByMonth={ unitsSoldByMonth } 
          /> 
          <CustomerList />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Report;
