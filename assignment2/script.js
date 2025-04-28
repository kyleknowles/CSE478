fetch("data.csv")
.then(response => response.text())
.then(csv => {
        let rows = csv.split("\n");
        let headers = rows[0].split(",");
        data = rows.slice(1).map(row => {
        let values = row.split(",");
            return headers.reduce((obj, key, i) => {
                // Creates objects of instance, key pairs
                obj[key] = values[i]
                return obj; }, {});
        });
        return data
    })
    // Creates svg graphs

    .then (data => {
        const barWidth = 30
        const svg = d3.select("svg");

        const color = d3.scaleOrdinal()
            .domain(["Fruit", "Vegetable"])
            .range(["steelblue", "red"]);

        
        
        const margin = {top: 20, right: 20, bottom: 20, left: 40};
        const width = 450 - margin.left - margin.right;
        const height = 450 - margin.top - margin.bottom;

        const chart = svg.append("g")
            .attr("transform", `translate(${margin.right}, ${margin.top})`);


        const maxValue = Math.max(...data.map(d => d.value)); 

        const xScale = d3.scaleBand()
            .domain([...new Set(data.map(d => d.name))])
            .range([0, 800])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, 21])
            .range([0, 450]);
        


        const bars = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.name))
            .attr("y", d => 450 - yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(d.value))
            .attr("fill", d => color(d.category));
            d3.select(this) 
                // Fill magenta on hover
                .style("fill", "magenta")
            d3.select("#tooltip")
                // Shows tooltip details on hover
                .style("display", "block")
                .html(`${d.name}`);
    })
    // Back to default values off of hover
    .on("mouseout", function(event, d) {
        d3.select(this)
            .style("fill", "steelblue")
        d3.select("#tooltip")
        
            .style("display", "none")

        const labels = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")

            .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
            .attr("y", d => 450 - yScale(d.value) - 3) // + 6 * d.name.length
            //.attr("transform", d => `rotate(90, ${xScale(d.name) + xScale.bandwidth() / 2 - 4}, ${450 - yScale(d.value) +  6 * d.name.length})`)
            .attr("text-anchor", "middle")
            
            //.text(d => d.name);
            .text(d => d.value);

        const cats = ["Fruit", "Vegetable"];
        const legend = svg.selectAll("circle")
            .data(cats)
            .enter()
            .append("circle")
            .attr("cx", 600)
            .attr("cy", (_, i) => 60 + 30 * i)
            .attr("r", 12)
            .attr("fill", (_, i) => color(cats[i]));

        const legendText = svg.selectAll(".legend-text")
            .data(cats)
            .enter()
            .append("text")
            .attr("x", 620)
            .attr("y", (_, i) => 66 + 30 * i)
            .text((d, i) => cats[i]);
        
    }); 
        


                        /*
                        

            // add axis labels
            // add tooltops
            // comment code

                        */
