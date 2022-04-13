var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var svg = d3.select("#danceVeng")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
var svgSI = d3.select("#speechVinst")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// read data
d3.csv("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2020/2020-01-21/spotify_songs.csv")
    .then(function(d) {
        makeHexPlotDVE(d)
        makeHexPlotSVI(d)
});

function makeHexPlotSVI(data){
// append the svg object to the body of the page

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 1])
        .range([ 0, width ])
    svgSI.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svgSI.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Instrumentalness");
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0 ]);
    svgSI.append("g")
        .call(d3.axisLeft(y));

    svgSI.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Speechiness");

    // Reformat the data: d3.hexbin() needs a specific format
    var inputForHexbinFun = []
    data.forEach(function(d) {
        inputForHexbinFun.push( [x(d.speechiness), y(d.instrumentalness)] )  // Note that we had the transform value of X and Y !
    })

    // Prepare a color palette
    var color = d3.scaleLinear()
        .domain([0, 600]) // Number of points in the bin?
        .range(["transparent",  "#69b3a2"])

    // Compute the hexbin data
    var hexbin = d3.hexbin()
        .radius(9) // size of the bin in px
        .extent([ [0, 0], [width, height] ])

    // Plot the hexbins
    svgSI.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height)

    svgSI.append("g")
        .attr("clip-path", "url(#clip)")
        .selectAll("path")
        .data( hexbin(inputForHexbinFun) )
        .enter().append("path")
        .attr("d", hexbin.hexagon())
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("fill", function(d) { return color(d.length * 20); })
        .attr("stroke", "black")
        .attr("stroke-width", "0.1")
}

function makeHexPlotDVE(data){
// append the svg object to the body of the page

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 1])
        .range([ 0, width ])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Dance-Ability");
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Energy");

    // Reformat the data: d3.hexbin() needs a specific format
    var inputForHexbinFun = []
    data.forEach(function(d) {
        inputForHexbinFun.push( [x(d.danceability), y(d.energy)] )  // Note that we had the transform value of X and Y !
    })

    // Prepare a color palette
    var color = d3.scaleLinear()
        .domain([0, 600]) // Number of points in the bin?
        .range(["transparent",  "#69b3a2"])

    // Compute the hexbin data
    var hexbin = d3.hexbin()
        .radius(9) // size of the bin in px
        .extent([ [0, 0], [width, height] ])

    // Plot the hexbins
    svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height)

    svg.append("g")
        .attr("clip-path", "url(#clip)")
        .selectAll("path")
        .data( hexbin(inputForHexbinFun) )
        .enter().append("path")
        .attr("d", hexbin.hexagon())
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("fill", function(d) { return color(d.length * 20); })
        .attr("stroke", "black")
        .attr("stroke-width", "0.1")
}


/*var height = 350;
var width = 700;
var margin = ({top: 20, right: 30, bottom: 30, left: 40});

// initialize our scales
var x, y, color;



var url = "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2020/2020-01-21/spotify_songs.csv"

d3.csv(url).then(function(d) {
    console.log(d);
    createPlot1(d)
    //buildScatter(d);
});

// track_id
// track_name
// track_artist
// track_popularity
// track_album_id
// track_album_name
// track_album_release_date
// playlist_name
// playlist_id
// playlist_genre
// playlist_subgenre
// danceability
// energy
// key
// loudness
// mode
// speechiness
// acousticness
// instrumentalness
// liveness
// valence
// tempo
// duration_ms
function createPlot1(data) {
    console.log("here")
    x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.danceability)).nice()
        .range([margin.left, width - margin.right])

    y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.track_popularity)).nice()
        .range([height - margin.bottom, margin.top])

    color = d3.scaleOrdinal(data.map((d) => d.playlist_genre),
        d3.schemeCategory10
    )


    // make our blank svg canvas
    var svg = d3
        .select("svg")
        .attr("viewBox", [0, 0, width, height])
        .property("value", []);

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // draw some dots!

    var dot = svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return 40; } )
        .attr("cy", function (d) { return 20; } )
        .style("opacity", .5)
        //.attr("fill", 'blue')
        .attr("fill", (d) => color(d.playlist_genre))
        .attr("r", (d) => 1)
        .on("mouseover",(e,d) => {    // event listener to show tooltip on hover
            d3.select("#bubble-tip-"+d.track_id)
                .style("display","block");
        })
        .on("mouseout", (e,d) => {    // event listener to hide tooltip after hover
            if(!d.toolTipVisible){
                d3.select("#bubble-tip-"+d.track_id)
                    .style("display","none");
            }
        })
        .on("click", (e,d) => {    // event listener to make tooltip remain visible on click
            if(!d.toolTipVisible){
                d3.select("#bubble-tip-"+d.track_id)
                    .style("display", "block");
                d.toolTipVisible = true;
            }
            else{
                d3.select("#bubble-tip-"+d.track_id)
                    .style("display", "none");
                d.toolTipVisible = false;
            }
        })


    svg.selectAll(".bubble-tip")
        .data(data)
        .join("g")
        .attr("class", "bubble-tip")
        .attr("id", (d)=> "bubble-tip-"+d.ID)
        .attr("transform", d => "translate(" + (x( d.danceability )+20) + ", " + y( d.track_popularity) + ")"  )
        .style("display", "none")
        .append("rect")
        .attr("x",-5)
        .attr("y",-20)
        .attr("rx",5)
        .attr("fill","white")
        .attr("fill-opacity", 0.9)
        .attr("width",180)
        .attr("height",80)


    svg.selectAll(".bubble-tip")
        .append("text")
        .text(d =>d.track_name +  " - " + d.playlist_genre)
        .style("font-family", "sans-serif")
        .style("font-size", 14)
        .attr("stroke", "none")
        .attr("fill", d => color(d.playlist_genre))

    svg.selectAll(".bubble-tip")
        .append("text")
        .classed("bubble-tip-yText", true)
        .text(d => "Popularity: " + d.track_popularity + " mpg")
        .attr("y", 26 )
        .style("font-family", "sans-serif")
        .style("font-size", 14)
        .attr("stroke", "none")
        .attr("fill", d => color(d.playlist_genre))
    svg.selectAll(".bubble-tip")
        .append("text")
        .classed("bubble-tip-yText", true)
        .text(d => "Dance-ability: " + d.danceability)
        .attr("y", 44)
        .style("font-family", "sans-serif")
        .style("font-size", 14)
        .attr("stroke", "none")
        .attr("fill", d => color(d.playlist_genre))

    svg.selectAll("circle")
        .transition()
        .delay(function(d,i){return(i*4);})
        .duration(3000)
        .attr("cx", function (d) { return x(+d.danceability); } )
        .attr("cy", function (d) { return y(+d.track_popularity); } )
        .attr("r", (d) => +d.danceability)

} // end of build scatter



const xAxis = (g) =>
    g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .call((g) =>
            g
                .append("text")
                .attr("x", width - margin.right)
                .attr("y", -4)
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "end")
                .text("Dance-ability")
        )


const yAxis = (g) =>
    g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) =>
            g
                .select(".tick:last-of-type text")
                .clone()
                .attr("x", 4)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text("Popularity")
        )
*/
