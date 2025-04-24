    
function load() {
    fetch("Basic_Stats.csv")
        .then(response => response.text())
            .then(csv => {
                let rows = csv.split("\n");
                let headers = rows[0].split(",");
                let data = rows.slice(1).map(row => {
                let values = row.split(",");
                return headers.reduce((obj, key, i) => {
                    obj[key] = values[i];
                    return obj; }, {});
                    });
                    alert(data); 
                });
}

function load2() {
    const data = [
        {id: 1, radius: 20},
        {id: 2, radius: 25},
        {id: 3, radius: 15},
        {id: 4, radius: 30},
        {id: 5, radius: 18},
    ];

const svg = d3.select("svg");

const circles = svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", (d, i) => 60 + i * 80)
.attr("cy", 60)
.attr("r", d => d.radius)
.attr("fill", "steelblue")
.on("click", function(event, d) {
d3.select(this).classed("highlighted", function() {
    return !d3.select(this).classed("highlighted");
});
});
alert("F this")

}
