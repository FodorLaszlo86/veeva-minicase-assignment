import React from 'react';
import * as d3 from 'd3';


const monthlySellings = ({ sellingByMonth }) => {
    const sellingData = Object.entries(sellingByMonth);
    const months = [
        'Jan', 'Feb', 'Mar', 
        'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 
        'Okt', 'Nov', 'Dec'
    ]

    let width = 500;
    let height = 300
    let leftPadding = (width - (40 * 11)) / 2;

   
    const xScale = d3.scaleBand()
                     .range([0, width - leftPadding])
                     .domain(months.map(m => m))
                     .padding(-0.25)

    const svg = d3.select('#svg-monthly-stats')
                  .classed('svg-container', true)
                  .append('svg')
                  .attr("preserveAspectRatio", "xMinYMin meet")
                  .attr("viewBox", "0 0 500 300")
                  .classed('svg-responsive', true)

    svg.selectAll('rect')
       .data(sellingData)
       .enter()
       .append('rect')
       .attr('width', 25)
       .attr('height', d => d[1] / 15)
       .attr('x', (d, i) => i * 40)
       .attr('y', (d, i) => height - d[1] / 15 - 30)

    svg.selectAll('text')
       .data(sellingData)
       .enter()
       .append('text')
       .text(d => d[1])
       .attr('x', (d, i) => i * 40)
       .attr('y', (d, i) => height - d[1] / 15 - 35)
       .style('font-size', '1.4rem')
       .style('fill', '#eee')

    svg.append('g')
       .attr('transform', `translate(-5, ${ height - 30 })`)
       .call(d3.axisBottom(xScale))

      svg.append("text")
         .attr("x", (width / 2))             
         .attr("y", 30)
         .attr("text-anchor", "middle")  
         .style("font-size", "16px")
         .style('text-transform', 'uppercase') 
         .style('fill', '#ccc') 
         .text("Sold Units per Month, 2018");


  return (
     <div id='svg-monthly-stats'></div>
 )
}

export default monthlySellings;