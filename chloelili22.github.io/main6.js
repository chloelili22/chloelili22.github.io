//
// ********* brushable Scatter Plot *************
//
function brushableScatterplot6(data6) {
    var margin = { top: 30, right: 150, bottom: 80, left: 80 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        tooltip = { width: 100, height: 100, x: 10, y: -30 };

    taxiCompany = Array.from(new Set(data6.map(d=> d['Company'])));
    compColor = d3.scaleOrdinal().domain(taxiCompany).range(d3.schemeCategory10);
    
    // the value for when there is no brush
    const initialValue = data6;
    
    //initialize margin end
    var svg = d3.select("#brushPlot6").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .property('value', initialValue)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xAxis = (g, scale, label) =>
    g.attr('transform', `translate(0, ${height})`)
        // add axis
        .call(d3.axisBottom(scale))
        // remove baseline
        .call(g => g.select('.domain').remove())
        // add grid lines
        .call(g => g.selectAll('.tick line')
          .clone()
            .attr('stroke', '#d3d3d3')
            .attr('y1', -height)
            .attr('y2', 0))
      // add label
      .append('text')
        .attr('x', width/2)
        .attr('y', 40)
        .attr('fill', 'black')
        .attr('text-anchor', 'middle')
        .text(label)

        yAxis = (g, scale, label) => 
            g.call(d3.axisLeft(scale)) // add axis
            .call(g => g.select('.domain').remove()) // remove baseline
            // add grid lines
            .call(g => g.selectAll('.tick line')
              .clone()
                .attr('stroke', '#d3d3d3')
                .attr('x1', 0)
                .attr('x2', width))
          // add label
          .append('text')
            .attr('x', -150)
            .attr('y', -margin.left+30)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "end")
            .attr('fill', 'black')
            .attr('dominant-baseline', 'middle')
            .text(label)

    // set plot title
    svg.append("text")
        .attr("x", width - 300)
        .attr("y", 13)
        .style("text-anchor", "middle")
        .text("Interactive Plot Between Fare and Miles of Trips in June");

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
        .domain(d3.extent(data6, d => d['Trip Miles'])).nice()
        .range([0, width])

    const y = d3.scaleLinear()
        .domain(d3.extent(data6, d => +d['Fare'])).nice()
        .range([height, 0])
    
    // axes
    g.append("g").call(xAxis, x, 'Distance (miles)');
    g.append("g").call(yAxis, y, 'Fare ($)');
    
    // draw points
    const radius = 2;
    
    const dots = g.selectAll('circle')
        .data(data6)
        .join('circle')
        .attr('cx', d => x(d['Trip Miles']))
        .attr('cy', d => y(d['Fare']))
        .attr('fill', d =>  compColor(d['Company']))
        .attr('opacity', 1)
        .attr('r', radius);
    
    // ********** brushing here **********
    
    const brush = d3.brush()
        // set the space that the brush can take up
        .extent([[0, 0], [width, height]])
        // handle events
        .on('brush', onBrush)
        .on('end', onEnd);
    
    g.append('g')
        .call(brush);
    
    function onBrush(event) {
    // event.selection gives us the coordinates of the
    // top left and bottom right of the brush box
    const [[x1, y1], [x2, y2]] = d3.event.selection;
    
    // return true if the dot is in the brush box, false otherwise
    function isBrushed(d) {
        const cx = x(d['Trip Miles']);
        const cy = y(d['Fare'])
        return cx >= x1 && cx <= x2 && cy >= y1 && cy <= y2;
    } 
    
    // style the dots
    dots.attr('fill', d => isBrushed(d) ? compColor(d['Company']) : 'gray');
    
    values = data6.filter(isBrushed)

    var taxi_data = "Total Trips: " + values.length + '</p>';

    for(let i=0; i < values.length; i++) {
        taxi_data = taxi_data.concat("Taxi Company: ", values[i].Company, ", Distance: ", values[i]['Trip Miles'], ", Fare: ", values[i].Fare, ", Tips: ", values[i]['Tips']);
        taxi_data = taxi_data + '</p>'
    }

    content = 
    `
    <div>
    ${taxi_data}
    </div>
    `
    const text = document.querySelector("#data6");
    text.innerHTML = content
    // update the data 
    svg.property('value', data6.filter(isBrushed)).dispatch('input');
    }
    
    function onEnd(event) {
    // if the brush is cleared
    if (d3.event.selection === null) {
        // reset the color of all of the dots
        dots.attr('fill', d => compColor(d['Company']));
        svg.property('value', initialValue).dispatch('input');
    }
    }

    return svg.node();
}
d3.csv("https://raw.githubusercontent.com/uic-vis/project-3-sli/main/taxiTrips6.csv")
    .then(brushableScatterplot6)



//
// *********** scatterplot for multiple linked views ***********
//

// function brushableScatterplot6(data6) {
//     var margin = { top: 30, right: 150, bottom: 80, left: 80 },
//         width = 960 - margin.left - margin.right,
//         height = 500 - margin.top - margin.bottom,
//         tooltip = { width: 100, height: 100, x: 10, y: -30 };

//     taxiCompany = Array.from(new Set(data6.map(d=> d['Company'])));
//     compColor = d3.scaleOrdinal().domain(taxiCompany).range(d3.schemeCategory10);
    
//     // the value for when there is no brush
//     const initialValue = data6;
    
//     //initialize margin end
//     var svg = d3.select("#scatterplot6").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .property('value', initialValue)
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     xAxis = (g, scale, label) =>
//     g.attr('transform', `translate(0, ${height})`)
//         // add axis
//         .call(d3.axisBottom(scale))
//         // remove baseline
//         .call(g => g.select('.domain').remove())
//         // add grid lines
//         .call(g => g.selectAll('.tick line')
//           .clone()
//             .attr('stroke', '#d3d3d3')
//             .attr('y1', -height)
//             .attr('y2', 0))
//       // add label
//       .append('text')
//         .attr('x', width/2)
//         .attr('y', 40)
//         .attr('fill', 'black')
//         .attr('text-anchor', 'middle')
//         .text(label)

//         yAxis = (g, scale, label) => 
//             g.call(d3.axisLeft(scale)) // add axis
//             .call(g => g.select('.domain').remove()) // remove baseline
//             // add grid lines
//             .call(g => g.selectAll('.tick line')
//               .clone()
//                 .attr('stroke', '#d3d3d3')
//                 .attr('x1', 0)
//                 .attr('x2', width))
//           // add label
//           .append('text')
//             .attr('x', -160)
//             .attr('y', -margin.left+30)
//             .attr("transform", "rotate(-90)")
//             .attr("text-anchor", "end")
//             .attr('fill', 'black')
//             .attr('dominant-baseline', 'middle')
//             .text(label)

//     // set plot title
//     svg.append("text")
//         .attr("x", width - 300)
//         .attr("y", 13)
//         .style("text-anchor", "middle")
//         .text("Interactive Plot Between Fare and Tips of Trips in June");

//     const g = svg.append('g')
//         .attr('transform', `translate(${margin.left}, ${margin.top})`);

//     const x = d3.scaleLinear()
//         .domain(d3.extent(data6, d => +d['Fare'])).nice()
//         .range([0, width])

//     const y = d3.scaleLinear()
//         .domain(d3.extent(data6, d => d['Tips'])).nice()
//         .range([height, 0])
    
//     // axes
//     g.append("g").call(xAxis, x, 'Fare ($)');
//     g.append("g").call(yAxis, y, 'Tips ($)');
    
//     // draw points
//     const radius = 2;
    
//     const dots = g.selectAll('circle')
//         .data(data6)
//         .join('circle')
//         .attr('cx', d => x(d['Fare']))
//         .attr('cy', d => y(d['Tips']))
//         .attr('fill', d =>  compColor(d['Company']))
//         .attr('opacity', 1)
//         .attr('r', radius);
    
//     // ********** brushing here **********
    
//     const brush = d3.brush()
//         // set the space that the brush can take up
//         .extent([[0, 0], [width, height]])
//         // handle events
//         .on('brush', onBrush)
//         .on('end', onEnd);
    
//     g.append('g')
//         .call(brush);
    
        
//     function onBrush(event) {
//         // event.selection gives us the coordinates of the
//         // top left and bottom right of the brush box
//         const [[x1, y1], [x2, y2]] = d3.event.selection;
        
//         // return true if the dot is in the brush box, false otherwise
//         function isBrushed(d) {
//             const cx = x(d['Fare']);
//             const cy = y(d['Tips'])
//             return cx >= x1 && cx <= x2 && cy >= y1 && cy <= y2;
//         } 
        
//         // style the dots
//         dots.attr('fill', d => isBrushed(d) ? compColor(d['Company']) : 'gray');
        
//         var values = data6.filter(isBrushed)

//         var taxi_data = "Total Trips: " + values.length + '</p>';

//         for(let i=0; i < values.length; i++) {
//             taxi_data = taxi_data.concat("Taxi Company: ", values[i].Company, ", Distance: ", values[i]['Trip Miles'], ", Fare: ", values[i].Fare, ", Tips: ", values[i]['Tips']);
//             taxi_data = taxi_data + '</p>'
//         }

//         content = 
//         `
//         <div>
//         ${taxi_data}
//         </div>
//         `
//         const text = document.querySelector("#data6_2");
//         text.innerHTML = content

//         // update the data 
//         svg.property('value', data6.filter(isBrushed)).dispatch('input');
//     }



//     function onEnd(event) {
//         // if the brush is cleared
//         if (d3.event.selection === null) {
//             // reset the color of all of the dots
//             dots.attr('fill', d => compColor(d['Company']));
//             svg.property('value', initialValue).dispatch('input');
//         }
//     }

//     return svg.node();
// }




// //
// // ******* barChart ************* 
// //
// function barChart6(data6){
//     taxiCompany = Array.from(new Set(data6.map(d=> d['Company'])));
//     compColor = d3.scaleOrdinal().domain(taxiCompany).range(d3.schemeCategory10);

//     const margin = {top: 40, right: 150, bottom: 50, left: 350};
  
//     const visWidth = 400;
//     const visHeight = 300; 
  
//     var svg = d3.select("#barChart6").append("svg")
//         .attr('width', visWidth + margin.left + margin.right)
//         .attr('height', visHeight + margin.top + margin.bottom)
    
//     const g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     // set plot title
//     svg.append("text")
//         .attr("x", visWidth + 100)
//         .attr("y", 15)
//         .style("text-anchor", "middle")
//         .text("Bar Chart of Each Taxi Company in June");
  
//     // create scales
//     const x = d3.scaleLinear()
//         .range([0, visWidth]);
    
//     const y = d3.scaleBand()
//         .domain(compColor.domain())
//         .range([0, visHeight])
//         .padding(0.2);
  
//     // create and add axes
//     const xAxis = d3.axisBottom(x).tickSizeOuter(0);
    
//     const xAxisGroup = g.append("g")
//         .attr("transform", `translate(0, ${visHeight})`);
    
//      xAxisGroup.append("text")
//         .attr("x", visWidth / 2)
//         .attr("y", 30)
//         .attr("fill", "black")
//         .attr("text-anchor", "middle")
//         .text("Count of Trips");
    
//     const yAxis = d3.axisLeft(y);
    
//     const yAxisGroup = g.append("g")
//         .call(yAxis)
//         .call(g => g.select(".domain").remove());
    
//     yAxisGroup.append("text")
//         .attr("y", -margin.left+150)
//         .attr("x", -margin.top-50)
//         .attr("fill", "black")
//         .attr("transform", "rotate(-90)")
//         .attr("text-anchor", "end")
//         .text("Taxi Company Name");
      
    
//     function update(data) {

//         let barsGroup = g.append("g");
//         const originCounts = d3.rollup(
//            data,
//            group => group.length,
//            d => d['Company'],
//        );
    
//         // update x axis
//         const t = svg.transition()
//             .ease(d3.easeLinear)
//             .duration(200);
        
//         xAxisGroup
//         .transition(t)
//         .call(xAxis);

//         dataBar = []
//         maxCount = 0
//         for (i of originCounts) {
//             dataBar.push({
//                 comp: i[0], count: i[1]
//             })
//             maxCount = Math.max(maxCount, i[1])
//         }
//         // update x scale
//         x.domain([0, maxCount])
        
//         // draw bars primtype
//         barsGroup.selectAll("rect")
//             .data(dataBar)
//             .join("rect")
//             .attr('fill', d => compColor(d.comp))
//             .attr("height", y.bandwidth())
//             .attr("x", 0)
//             .attr("y", d => y(d.comp))
//             .transition(t)
//             .attr("width", (d => x(d.count)))
//     }

//     update(data6)
//     // return Object.assign(svg.node(), { update });;
  
//     // const scatter = brushableScatterplot3(data3);

//     // // update the bar chart when the scatterplot
//     // // selection changes
//     // d3.select(scatter).on('input', () => {  
//     //   update(scatter.value);
//     // });
  
//     // intial state of bar chart
//     // update(scatter.value);

// }


// // d3.csv("https://raw.githubusercontent.com/uic-vis/project-3-sli/main/taxiTrips6.csv")
// //     .then(barChart)

// function multiplePlot6(data6) {
//     const scatter = brushableScatterplot3(data6);
//     const bar = barChart(data6);
  
//     // update the bar chart when the scatterplot
//     // selection changes
// //     d3.select(scatter).on('input', () => {
// //       bar.update(scatter.value);
// //     });
  
// //     // intial state of bar chart
// //     bar.update(scatter.value);
  
// //     // use HTML to place the two charts next to each other
// //     // return html`<div style="display: flex">${scatter}${bar}</div>`;
//  }

//   d3.csv("https://raw.githubusercontent.com/uic-vis/project-3-sli/main/taxiTrips6.csv")
//     .then(multiplePlot6)




// // ********** multipleViews ***********
// //
