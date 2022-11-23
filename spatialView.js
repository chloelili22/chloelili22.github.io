function createBarChart() {

    var barChart = d3.selectAll('#plot').append('svg').style('width', '100%').style('height', '100%');
    var width = 40;
    var height = 30;
    console.log(chicagoData['features']);
    var g = barChart.selectAll('.bar')
        .data(chicagoData['features'])
        .enter()
        .append('g')
        .attr('class', 'bar');
    
    var x = d3.scaleLog().domain([1,1000]).range([0,200]);
    console.log(x(10));

    g.append('rect')
        .style('stroke-width', '1')
        .style('stroke', 'rgb(0,0,0)')
        .style('fill', 'rgb(200,200,200)')
        .attr('x', 70)
        .attr('y', (d,i) => {return 5+(height+5)*i})
        .attr('width', (d,i) => {return x(d['properties']['shape_area'])})
        .attr('height', height)
        .attr('id', (d,i) => {return d['properties']['community'].substring(0, 5)})

    g.append('text')
        .attr('x', 0)
        .attr('y', (d,i) => {return 15+(height+5)*i})
        .text((d,i) => {return d['properties']['community'].substring(0, 5);})

}

function createMap() {

    // 'map' is the id we wwant to dispaly the map, 4 is the zoom level
    var map = L.map('map').setView([37.8, -96], 4);

    // the tiles is the tile server, tile web map
    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,
    }).addTo(map);

    function style(feature) {
        var colorScale = d3.scaleQuantize()
            .range(colorbrewer.YlOrRd[9])
            .domain([0, 1000]);
        return {
            fillColor: colorScale(feature.properties.shape_area),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    
    function highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        
        var selectedState = layer.feature.properties.community.substring(0, 5);
        d3.selectAll("#"+selectedState).style('fill', 'rgb(120,50,50)')
    
        layer.bringToFront();
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        d3.selectAll("rect").style('fill', 'rgb(200,200,200)')
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
        
    }

    var geojson = L.geoJson(chicagoData, {style: style, onEachFeature: onEachFeature}).addTo(map);
}


function init(){
    createMap();
    createBarChart();
}

window.onload = init;