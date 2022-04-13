var height = 350;
var width = 700;
var margin = ({top: 20, right: 30, bottom: 30, left: 40});

// initialize our scales
var x, y, color;

var dataset;  //Global var

var url = "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2020/2020-01-21/spotify_songs.csv"

d3.csv(url, function(error, data) {
    // If error is not null, something went wrong.
    if (error) {
        console.log(error);  //Log the error.
    } else {
        //console.log(data);   //Log the data.
        dataset = data; // Give the data a global scope
        //Call some other functions that generate the visualization
        createPlot1(dataset)
        //createPlot2(dataset)
        //createPlot3(dataset)
    }
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

