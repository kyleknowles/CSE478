
// loads data
fetch("data.csv")
.then(response => response.text())
.then(csv => {
        // splits data rows
        let rows = csv.split("\n");

        // splits data columns
        let headers = rows[0].split(",");

        // creates key,value pair objects and returns them
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
        
        // initalizes svg
        const svg = d3.select("svg");


        // Creates color scale mapping categorical values to certain colors
        const color = d3.scaleOrdinal()
            .domain(["Fruit", "Vegetable"])
            .range(["steelblue", "red"]);

        
        // Defines margins
        const margin = {top: 20, right: 5, bottom: 70, left: 30};

        // Defines width based on left and right margins
        const width = 800 - margin.left - margin.right;

        // Defines height based on top and bottom margins
        const height = 450 - margin.top - margin.bottom;

        // Defines x scale based on d.name categorical values
        const xScale = d3.scaleBand()
            .domain([...new Set(data.map(d => d.name))])
            .range([0, width])
            .padding(0.1);

        // Defines y scale based on d.value values
        const yScale = d3.scaleLinear()
            .domain([20, 0])
            .range([0, height]);

        // Creates g object
        svg.append("g")
            // Creates x-axis based on name category
            .attr("transform", `translate(${margin.left}, ${450 - margin.bottom})`)
            .call(d3.axisBottom(xScale))

            // Rotatates x-axis 90 degrees
            .selectAll("text") 
                .attr("transform", "rotate(90)")
                .style("text-anchor", "start")  
                .attr("dx", "0.5em")              
                .attr("dy", "-0.5em");

        // Creates g object
        svg.append("g")
            // Creates y-axis based on value
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(yScale));
        
        
      
        // 
        const bars = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.name) + margin.left)
            .attr("y", d => 450 - yScale(20 - d.value) - margin.bottom)
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(20 - d.value))
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
                d3.select(".tooltip")
                
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

        const labels = svg.selectAll(".labels-text")
            .data(data)
            .enter()
            .append("text")

            .attr("x", d => xScale(d.name) + margin.left + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.value) + margin.bottom - 3) 
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
        

        
    }); 
        


          
