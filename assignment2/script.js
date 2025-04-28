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

        
        
        const margin = {top: 20, right: 5, bottom: 20, left: 30};
        const width = 800 - margin.left - margin.right;
        const height = 450 - margin.top - margin.bottom;



   
        const maxValue = Math.max(...data.map(d => d.value)); 

        const xScale = d3.scaleBand()
            .domain([...new Set(data.map(d => d.name))])
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, 20])
            .range([0, height]);


        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${450 - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
            .call(d3.axisLeft(yScale));
        

      

        const bars = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.name) - margin.left)
            .attr("y", d => 450 - yScale(d.value) - margin.bottom)
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(d.value))
            .attr("fill", d => color(d.category))
            .on("mouseover", function(event, d) {
                d3.select(this) 
                    // Fill magenta on hover
                    .style("fill", "magenta");
                d3.select("#tooltip")
                    // Shows tooltip details on hover
                    .style("display", "block")
                    .html(`${d.name}, ${d.category}, ${d.value}`);
            })
            .on("mouseout", function(event, d) {
                d3.select(this)
                    .style("fill", d => color(d.category));
                d3.select("#tooltip")
                
                    .style("display", "none");
                
            })      


    // Back to default values off of hover
    /*
    .on("mouseout", function(event, d) {
        d3.select(this)
            .style("fill", "steelblue")
        d3.select("#tooltip")
        
            .style("display", "none")
            */

        const labels = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")

            .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
            .attr("y", d => 450 - margin.bottom - yScale(d.value) - 3)
            .attr("text-anchor", "middle")
            
            //.text(d => d.name);
            .text(d => d.value);

        const cats = ["Fruit", "Vegetable"];
        const legend = svg.selectAll("circle")
            .data(cats)
            .enter()
            .append("circle")
            .attr("cx", 600)
            .attr("cy", (_, i) => 50 + 30 * i)
            .attr("r", 12)
            .attr("fill", (_, i) => color(cats[i]));

        const legendText = svg.selectAll(".legend-text")
            .data(cats)
            .enter()
            .append("text")
            .attr("x", 620)
            .attr("y", (_, i) => 56 + 30 * i)
            .text((d, i) => cats[i]);
        
            /*
        const barText = svg.selectAll(".label-text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)  
            .attr("y", 450 - margin.bottom + 10)  
            .attr("transform", d => `rotate(90, ${xScale(d.name) + xScale.bandwidth() / 2}, ${450 - margin.bottom + 10})`)
            .attr("text-anchor", "start")
            .text(d => d.name);
            */
        
        
    }); 
        


                        /*
                        

            // add axis labels
            // add tooltops
            // comment code

                        */
