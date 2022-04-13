
// map stuff

// Promise.all([
//     d3.json('../public/world.geojson'),
//     d3.csv('../public/cities.csv')
// ]).then( ([countries, cities]) => {
//     createMap(countries,cities)
// })
//
//
// function createMap(countries, cities) {
//     console.log(countries)
// }



















function reloadPage() {
    window.location.reload()
}

console.log(d3); // test if d3 is loaded
const dataset = [73, 18, 56, 38, 4]

// d3.select('svg').append('circle').attr('cx', 50).attr('cy', 50).attr('r', 50);

const width = 500;
const height = 500;

const linscale = d3.scaleLinear()
    .domain([0, 100]) // unit: km
    .range([0, width]); // unit: px

const yAxisScale = d3.scaleLinear()
    .domain([100, 0]) // unit: km
    .range([0, width]); // unit: px

const colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range(['blue', 'red']);

const axis = d3.axisLeft()
    .scale(yAxisScale)
    .ticks(20);

// Add Rectangles

d3.select('.svg2')
    .append('g')
    .selectAll('rect')
    .data(dataset)
    .enter().append('rect')
    .attr('width',50)
    .attr('height', data => linscale(data))
    .attr('stroke', 'black')
    .attr('fill', data => colorScale(data))
    .attr('x', function (d, i) { return (i * 75) + 50; })
    .attr('y', data => 500 - linscale(data))
    .attr('transform', 'translate(75,0)');


d3.select('.svg2')
    .append('g')
    .attr('transform', 'translate(50, 0)')
    .call(axis);



// Add Circles
const circle = d3.select('.svg1')
    .append('circle')
    .attr('cx', 100)
    .attr('cy', 400)
    .attr('r', 35)
    .attr('stroke', 'black')
    .attr('fill', 'red');

circle.transition()
    .delay(2000)
    .duration(2000)
    .attr('cx', 300)
    .attr('cy', 20)
    .attr('r', 10)
    .attr('fill', 'green')
// can chain multiple transitions
// .each('end' function () {d3.select(this).attr('fill', 'blue')} ) // can use to add something at end of transition or start

// // cool array manipulation
// console.log(d3.min(dataset)) // min val
// console.log(d3.max(dataset)) // max val
// console.log(d3.extent(dataset)) // array of min and max
// console.log(d3.sum(dataset)) // sum
// console.log(d3.mean(dataset)) // mean
// console.log(d3.median(dataset)) // median
// console.log(d3.shuffle(dataset)) // suffle


// loading external data

// json same for csv just replace with .csv
// [{'name': 'Maria', 'age': 30}, {'name': 'Fred;, 'age': 50}, {'name': 'Francis', 'age': 12}]
/*d3.json('fileLocation', function (data) {
    const canvas = d3.select('body').append('svg')
        .attr('width', 500)
        .attr('height', 500)

    canvas.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', data => data.age)
        .attr('height', 48)
        .attr('y', function(d, i) { return i * 50 })
        .attr('fill', 'blue')

    canvas.selectAll('text)
        .data(data)
        .enter()
            .append('text')
            .attr('fill', 'white')
            .attr('y', function (d, i) { return (i * 50) + 24; })
            .text(data => data.name)
})*/


// Add Lines
const lineData = [{x:0, y:0}, {x:100, y:150}, {x:200, y:400}, {x:300, y:900}, {x:400, y:700}, {x:500, y:500}, {x:600, y:500}, {x: 700, y: 500}, {x: 800, y: 500}];
const svg1 = d3.select('.svg3').append('svg');
const lineFunc = d3.line()
    .x(d => d.x)
    .y(d => 1000 - d.y);

svg1.append('path')
    .attr('d', lineFunc(lineData))
    .attr('stroke', 'purple')
    .attr('fill', 'none');



const svg2 = d3.select('.svg4').append('svg');
const curveFunc = d3.line()
    .curve(d3.curveBasis)              // This is where you define the type of curve. Try curveStep for instance.
    .x(d => d.x)
    .y(d => 1000 - d.y)


svg2.append('path')
    .attr('d', curveFunc(lineData))
    .attr('stroke', 'black')
    .attr('fill', 'none');

const svg3 = d3.select('.svg5').append('svg');
const curveFunc2 = d3.area()
    .curve(d3.curveNatural)
    .x(d => d.x)
    .y1(d => 1000 - d.y)
    .y0(1000);

svg3.append('path')
    .attr('d', curveFunc2(lineData))
    .attr('stroke', 'black')
    .attr('fill', 'yellow')

// Add Polygons
const svg6 = d3.select('.svg6').append('svg');


// Add Paths

const svg7 = d3.select('.svg7').append('svg');

const newData = [{x: 10, y: 20}, {x: 40, y: 60}, {x: 50, y: 70}]

const newGroup = svg7.append('g').attr('transform', 'translate(100, 100)');

const newLine = d3.line()
    .x(data => data.x)
    .y(data => data.y);

newGroup.selectAll('path')
    .data([newData])
    .enter()
    .append('path')
    .attr('d', newLine)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 20)


// arcs
const svg8 = d3.select('.svg8').append('svg');
const group2 = svg8.append('g').attr('transform', 'translate(100, 100)');

const r = 100;
const p = Math.PI * 2;

const arc = d3.arc()
    .innerRadius(r - 20)
    .outerRadius(r)
    .startAngle(0)
    .endAngle(p - 1);

group2.append('path')
    .attr("class", "arc")
    .attr("d", arc)
    .attr("fill","green");

// arc donut chart
const svg9 = d3.select('.svg9').append('svg');
const group9 = svg9.append('g').attr('transform', 'translate(300, 300)');

const r2 = 300;
const color = d3.scaleOrdinal()
    .range(['red', 'blue', 'yellow', 'green', 'orange'])

const arc2 = d3.arc()
    .innerRadius(200)
    .outerRadius(r2)

const pie = d3.pie()
    .value(data => data)

const arcs = group9.selectAll('.arc')
    .data(pie(dataset))
    .enter().append('g')
    .attr('class', 'arc')


arcs.append('path')
    .attr('d', arc2)
    .attr('fill', data => color(data.data))

arcs.append('text')
    .attr('transform', data => 'translate(' + arc2.centroid(data) + ')')
    .attr('text-anchor', 'middle')
    .attr('font-size', '1.5em')
    .text(data => data.data)


// regular polygon
const svg10 = d3.select('.svg10').append('svg');

let poly = undefined;
let angle = undefined;
let angleRad = undefined;
const lineLength = 150;

function drawPoly(count) {
    if(poly) {
        poly.remove();
    }

    poly = svg10.append('g');

    angle = 360 / count;
    angleRad = Math.PI * angle / 180;

    for (let i = 0; i < count; i++) {
        // poly.append('line')
        //     .attr('stroke', 'black')
        //     .attr('x1', 0)
        //     .attr('y1', 0)
        //     .attr('x2', lineLength)
        //     .attr('y2', 0)
        //     .attr('transform', 'rotate(' + (angle * i) + ')')
        poly.append('line')
            .attr('stroke', 'black')
            .attr('x1', lineLength)
            .attr('y1', 0)
            .attr('x2', Math.cos(angleRad) * lineLength)
            .attr('y2', -Math.sin(angleRad) * lineLength)
            .attr('transform', 'rotate(' + (angle * i) + ')')
    }

    poly.attr('transform', 'translate(250, 250)')

}

drawPoly(10)

// making a simple tree
// const sourceData = {
//     source: {
//         x: 10,
//         y: 10
//     },
//     target: {
//         x: 300,
//         y: 300
//     }
// };
//
// const svg10 = d3.select('.svg10').append('svg');
// const group10 = svg10.append('g').attr('transform', 'translate(50, 50)');
//
// const diagonal = d3.linkHorizontal()
//     .x(data => data.x)
//     .y(data => data.y)
// group10.append('path')
//     .attr('fill', 'none')
//     .attr('stroke', 'black')
//     .attr('d', diagonal(sourceData))
// const treeData = {'name': 'Karla', 'children': [{'name': 'Liam', 'children': [{'name': 'Luke'},{'name': 'Greg'},{'name': 'Mark'}]}, {'name': 'Evan', 'children': [{'name': 'Paul', 'size': 3545}, {'name': 'Tom', 'size': 5731}]} ]}
// const tree = d3.tree()
//     .size([400, 400])
//
// const treeRoot = tree.hierarchy
// const nodes = tree.(treeData);
// const links = tree.links(nodes);
// const node = group10.selectAll('.node')
//     .data(nodes)
//     .enter(0)
//     .append('g')
//     .attr('class', 'node')
//     .attr('transform', data => 'translate(' + data.x + ', ' + data.y + ")")
//
// node.append('circle')
//     .attr('r', 5)
//     .attr('fill', 'purple')

// fun thing
const svg11 = d3.select('.svg11').append('svg');

const sky = svg11.append('g')
let numSkyChunks = 10
function createSkyChunks() {
    for (let i = 0; i < numSkyChunks; i++) {
        sky.append('rect')
            .attr('id', 'skyChunk' + i)
            .attr('stroke', 'lightblue')
            .attr('fill', 'lightblue')
            .attr('width', 1000)
            .attr('height', 50)
            .attr('x', 0)
            .attr('y', (50 * i))
    }
}
createSkyChunks()

const skyColorScale = d3.scaleLinear()
    .domain([0, 10])
    .range(['purple', 'red']);
function colorSkyChunks() {
    for (let i = 0; i < numSkyChunks; i++) {
        document.getElementById('skyChunk' + i).setAttribute('fill', skyColorScale(i))
        document.getElementById('skyChunk' + i).setAttribute('stroke', skyColorScale(i))
    }
}

const sun = svg11.append('g')
    .append('circle')
    .attr('class', 'sun')
    .attr('cx', 500)
    .attr('cy', 160)
    .attr('r', 80)
    .attr('stroke', 'yellow')
    .attr('fill', 'yellow');


sun.transition()
    .delay(2000)
    .duration(5000)
    .delay(5000)
    .attr('cx', 500)
    .attr('cy', 500)
    .attr('r', 225)
    .attr('stroke', 'orange')
    .attr('fill', 'orange')
    .on('end', data => colorSkyChunks())

const birdShape = [[{x: 700, y: 400}, {x:720, y: 385}, {x: 740, y: 400}], [{x: 740, y: 400}, {x:760, y: 385}, {x: 780, y: 400}], [{x: 800, y: 350}, {x: 820, y: 335}, {x: 840, y: 350}], [{x: 840, y: 350}, {x: 860, y: 335}, {x: 880, y: 350}], [{x: 900, y: 400}, {x: 920, y: 385}, {x: 940, y: 400}], [{x: 940, y: 400}, {x: 960, y: 385}, {x: 980, y: 400}]];

const birds = svg11.append('g');
const bird = d3.line()
    .curve(d3.curveNatural)
    .x(data => data.x)
    .y(data => data.y);

function makeBirds() {
    for (let i = 0; i < 6; i++) {
        if (i % 2 == 0) {
            birds.append('path')
                .data([birdShape[i]])
                .attr('d', bird)
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', 5)
                .attr('class', 'leftWing');
        } else {
            birds.append('path')
                .data([birdShape[i]])
                .attr('d', bird)
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', 5)
                .attr('class', 'rightWing');
        }
    }
}

makeBirds()


function birdsFlying() {
    birds.transition()
        .duration(5000)
        .attr('transform', 'translate(0,-75)')
        .transition()
        .duration(5000)
        .attr('transform', 'translate(0,50)')
        .on('end', birdsFlying)
};

birdsFlying();

const ocean = svg11.append('g')
    .append('rect')
    .attr('stroke', 'blue')
    .attr('fill', 'blue')
    .attr('width', 1000)
    .attr('height', 500)
    .attr('x', 0)
    .attr('y', 500)

const dolphin = svg11.append('text')
    .attr('transform', data => 'translate(300,800)')
    .attr('text-anchor', 'middle')
    .attr('font-size', '3em')
    .text(data => 'Dolphin')

dolphin.transition()
    .delay(10000)
    .duration(7000)
    .attr('transform', 'translate(300,500)')
    .transition()
    .duration(3000)
    .attr('transform', 'translate(300,800)')

const waveData = [{x: 0, y: 350}, {x: 100, y: 400}, {x: 200, y: 350}, {x: 300, y: 400}, {x: 400, y: 350}, {x: 500, y: 400}, {x: 600, y: 350}, {x: 700, y: 400}, {x: 800, y: 350}, {x: 900, y: 400}, {x: 1000, y: 350}];
const waveData2 = [{x: 0, y: 250}, {x: 100, y: 200}, {x: 200, y: 250}, {x: 300, y: 200}, {x: 400, y: 250}, {x: 500, y: 200}, {x: 600, y: 250}, {x: 700, y: 200}, {x: 800, y: 250}, {x: 900, y: 200}, {x: 1000, y: 250}];

const waveFunc = d3.area()
    .curve(d3.curveNatural)
    .x(d => d.x)
    .y1(d => 1000 - d.y)
    .y0(1000);

const waves = svg11.append('g')


const wave1 = waves.append('path')
    .attr('d', waveFunc(waveData))
    .attr('stroke', 'lightblue')
    .attr('fill', 'blue')
const wave2 = waves.append('path')
    .attr('d', waveFunc(waveData2))
    .attr('stroke', 'lightblue')
    .attr('fill', 'blue')

function wavesWaving() {
    wave1.transition()
        .duration(3000)
        .attr('transform', 'translate(0,-50)')
        .transition()
        .duration(3000)
        .attr('transform', 'translate(0,0)')
        .on('end', wavesWaving)

    wave2.transition()
        .duration(2000)
        .attr('transform', 'translate(0,-12)')
        .transition()
        .duration(4000)
        .attr('transform', 'translate(0,50)')
};

wavesWaving()

// data vis example for assignment 2
//const carsData = FileAttachment('cars-sample.csv').csv({typed: true})
// const carsData = d3.csv('cars-sample.csv').then(function(d) {
//     console.log(d);
//     buildScatter(d);
// })


/*function buildScatter(data) {
    const height = 600;
    const width = 800;
    const margin = ({top: 20, right: 30, bottom: 30, left: 40})
    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.Weight)).nice()
        .range([margin.left, width - margin.right])
    const y = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.MPG)).nice()
        .range([height - margin.bottom, width - margin.top])

    const svg100 = d3.select('.svg100')
        .append('svg')
        .attr('viewBox', [0, 0, width, height])
        .property('value', []);

    let dot = svg100.append('g')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .data(carsData)
        .join('circle')
        .attr('transform', (d) => 'translate(' + d.Weight + ', ' + d.MPG + ')')
        .attr('r', d => 3)
        //.attr('r', d => size(+d.Weight))


}*/



/* const marks = vl.markCircle()
    .data("url", "C:\\Users\\apeco\\Downloads")
    .encode(
        vl.x().field("Horsepower"),
        vl.y().field("MPG"),
        vl.tooltip().field("Name")
    )


document.body.appendChild(marks.render()) */
