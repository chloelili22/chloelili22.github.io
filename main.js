// function makeChart(data) {
//     //initialize margin start
//     var margin = { top: 30, right: 120, bottom: 30, left: 50 },
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom,
//     tooltip = { width: 100, height: 100, x: 10, y: -30 };

//     //initialize margin end
//     var svg = d3.select("body").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     var xScale = d3.scaleTime()
//         .domain(d3.extent(data, d => d['Trip Start Timestamp'])).nice()
//         .range([margin.left, width - margin.right])
    
//     var yScale = d3.scaleLinear()  
//         .domain(d3.extent(data, d => +d["Total Trips"])).nice()
//         .range([height - margin.bottom, margin.top])
 
//     var xAxis = (g) => g
//         .attr('transform', `translate(0,${height - margin.bottom})`)
//         .call(d3.axisBottom(xScale))
        
//     var yAxis = (g) => g
//         .attr('transform', `translate(${margin.left},0)`)
//         .call(d3.axisLeft(yScale))

//     // var parseDate = d3.timeParse("%m/%d/%Y");

//     // var dateFormatter = d3.timeFormat("%d/%m/%Y");

//     // var xAxis = d3.axisBottom()
//     //     .scale(xScale)
//     //     .tickFormat(dateFormatter);

//     // var yAxis = d3.axisLeft()
//     //     .scale(yScale)

//     line = d3.line()
//         .defined(d => !isNaN(d.total))
//         .x(function(d){return xScale(d["Trip Start Timestamp"]);})
//         .y(function(d){return yScale(d["Total Trips"]);})

//     // d3.csv("https://raw.githubusercontent.com/chloelili22/chloelili22.github.io/main/Daily%20Taxi%20Trip%202021%403.csv", function(data){
//     // data.forEach(function(d) {
//     //    d["Trip Start Timestamp"] = parseDate(d["Trip Start Timestamp"]);
//     // });

//         // console.log(data["Total Trips"])

//         // xScale.domain(d3.extent(data, function(d){return d["Trip Start Timestamp"]}))
//         // yScale.domain(d3.extent(data, function(d) {return d["Total Trips"];}))
//         svg.append('g').call(xAxis)
//         svg.append('g').call(yAxis)
      
//          // set plot title
//         svg.append("text")
//          .attr("x", width-400)
//          .attr("y", 15)
//          .style("text-anchor", "middle")
//          .text("Distribution of Monthly Taxi Trips in 2021");
        
//         // Draw the line.
//         svg.append('path')
//             .datum(data)
//             .attr('d', line);
        
//         // svg.append("g")
//         // .attr("class", "x axis")
//         // .attr("transform", "translate(0," + height + ")")
//         // .call(xAxis)
    
//         // svg.append("g")
//         //     .attr("class", "y axis")
//         //     .call(yAxis)
//         //     .append("text")
//         //     .attr("transform", "rotate(-90)")
//         //     .attr("y", 15)
//         //     .attr("dy", ".71em")
//         //     .style("text-anchor", "middle")
//         //     .text("Distribution of Monthly Taxi Trips in 2021");
                
    
//         // // Draw the line.
//         // svg.append('path')
//         //     .datum(data)
//         //     .attr("class", "line")
//         //     .attr('d', line);
//         // })
//         // return svg.node()
// }

// d3.csv("https://raw.githubusercontent.com/chloelili22/chloelili22.github.io/main/Daily%20Taxi%20Trip%202021%403.csv")
//     .then(makeChart);






// ********* brushable Scatter Plot *************
//
function brushableScatterplot3(data3) {
    var margin = { top: 30, right: 150, bottom: 80, left: 80 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        tooltip = { width: 100, height: 100, x: 10, y: -30 };

    taxiCompany = Array.from(new Set(data3.map(d=> d['Company'])));
    compColor = d3.scaleOrdinal().domain(taxiCompany).range(d3.schemeCategory10);
    
    // the value for when there is no brush
    const initialValue = data3;
    
    //initialize margin end
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .property('value', initialValue)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // svg.append("defs").append("clipPath")
    //     .attr("id", "clip")
    //     .append("rect")
    //     .attr("width", width)
    //     .attr("height", height)

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
        // add axis
        g.call(d3.axisLeft(scale))
            // remove baseline
            .call(g => g.select('.domain').remove())
            // add grid lines
            .call(g => g.selectAll('.tick line')
              .clone()
                .attr('stroke', '#d3d3d3')
                .attr('x1', 0)
                .attr('x2', width))
          // add label
          .append('text')
            .attr('x', -160)
            .attr('y', -margin.left+50)
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
        .text("Interactive Plot of Taxi Trips and Companies in March");

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
        .domain(d3.extent(data3, d => +d['Trip Miles'])).nice()
        .range([0, width])

    const y = d3.scaleLinear()
        .domain(d3.extent(data3, d => d['Fare'])).nice()
        .range([height, 0])
    
    // axes
    g.append("g").call(xAxis, x, 'Distance (Miles)');
    g.append("g").call(yAxis, y, 'Fare ($)');
    
    // draw points
    const radius = 2;
    
    const dots = g.selectAll('circle')
        .data(data3)
        .join('circle')
        .attr('cx', d => x(d['Trip Miles']))
        .attr('cy', d => y(d['Fare']))
        .attr('fill', d =>  compColor(d['Company']))
        .attr('opacity', 1)
        .attr('r', radius);


    // // another view of csv files 
    // var navWidth = 960 - margin.left - margin.right;
    //     navHeight = 500 - margin.top - margin.bottom;

    // var navSvg = d3.select("#data").append("svg")
    //     .attr("id", "nav_svg")
    //     .attr("width", navWidth + margin.left + margin.right)
    //     .attr("height", navHeight + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // var navXScale = d3.scaleTime().range([0, navWidth]);
    // var navYScale = d3.scaleLinear().range([navHeight, 0]);
    
    // // ********** brushing here **********
    
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
    
    // update the data 
    svg.property('value', data3.filter(isBrushed)).dispatch('input');
    }
    
    function onEnd(event) {
    // if the brush is cleared
    if (d3.event.selection === null) {
        // reset the color of all of the dots
        dots.attr('fill', d => compColor(d['Company']));
        svg.property('value', initialValue).dispatch('input');
    }
    }

    // return function update(data3) {
    //     var selection = d3.event.selection;
    //     x.domain(selection.map(x2.invert, x2));
    //     g.selectAll(".dot")
    //      .attr('cx', d => x(d['Trip Miles']))
    //      .attr('cy', d => y(d['Fare']))
    //     g.select(".axis--x").call(xAxis);
    // }

    return svg.node();
}
d3.csv("https://raw.githubusercontent.com/chloelili22/chloelili22.github.io/main/Taxi%20Trips%20in%20March.csv")
    .then(brushableScatterplot3)








// // ******* barChart ************* 

// function barChart(data3){
//     taxiCompany = Array.from(new Set(data3.map(d=> d['Company'])));
//     compColor = d3.scaleOrdinal().domain(taxiCompany).range(d3.schemeCategory10);

//     const margin = {top: 40, right: 50, bottom: 50, left: 210};
  
//     const visWidth = 400;
//     const visHeight = 300; 
  
//     var svg = d3.select("body").append("svg")
//         .attr('width', visWidth + margin.left + margin.right)
//         .attr('height', visHeight + margin.top + margin.bottom)
    
//     const g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     // set plot title
//     svg.append("text")
//         .attr("x", visWidth)
//         .attr("y", 15)
//         .style("text-anchor", "middle")
//         .text("Bar chart of each taxi company in March");
  
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
//         .attr("y", -margin.left+30)
//         .attr("x", -margin.top-100)
//         .attr("fill", "black")
//         .attr("transform", "rotate(-90)")
//         .attr("text-anchor", "end")
//         .text("Taxi Company Name");
      
    
  
//     function update(data3) {
        
//         let barsGroup = g.append("g");
//         const originCounts = d3.rollup(
//            data3,
//            group => group.length,
//            d => d['Company'],
//        );
//             // console.log(data3)
//             console.log(originCounts)

//         // update x scale
//         x.domain([0, d3.max(originCounts.values())]).nice()
    
//         // update x axis
//         const t = svg.transition()
//             .ease(d3.easeLinear)
//             .duration(200);
        
//         xAxisGroup
//         .transition(t)
//         .call(xAxis);
        
//         // draw bars primtype
//         barsGroup.selectAll("rect")
//             .data(originCounts, ([company, count]) => company)
//             .join("rect")
//             .attr('fill', ([company, count]) => compColor(company))
//             .attr("height", y.bandwidth())
//             .attr("x", 0)
//             .attr("y", ([company, count]) => y(company))
//             .transition(t)
//             .attr("width", ([company, count]) => x(count))
//     }

//     // const bar = barChart();
//     update(data3);
   
//     // return Object.assign(svg.node(), { update });;
// }


// d3.csv("https://raw.githubusercontent.com/chloelili22/chloelili22.github.io/main/Taxi%20Trips%20in%20March.csv")
//     .then(barChart)

// // d3.csv("https://raw.githubusercontent.com/chloelili22/chloelili22.github.io/main/Taxi%20Trips%20in%20March.csv")
// //     .then(barChart)
// // const bar = barChart();
// //     bar.update(data3);
// //     return bar;