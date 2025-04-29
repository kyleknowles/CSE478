
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
        const margin = {top: 30, right: 5, bottom: 80, left: 30};

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
                .attr("dx", "1.0em")              
                .attr("dy", "-0.5em");

        // Creates g object
        svg.append("g")
            // Creates y-axis based on value
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(yScale));
        
        // appends rects
        const bars = svg.selectAll("rect")
            // read data
            .data(data)
            // enter
            .enter()
            // add rect
            .append("rect")
            // define where rect starts
            .attr("x", d => xScale(d.name) + margin.left)
            .attr("y", d => 450 - yScale(20 - d.value) - margin.bottom)
            // define rect width
            .attr("width", xScale.bandwidth())
            // define rect height
            .attr("height", d => yScale(20 - d.value))
            // fill rect based on category
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

            // unhighlights and clears tooltip when not hovering over bar
            .on("mouseout", function(event, d) {
                d3.select(this)
                    .style("fill", d => color(d.category));
                d3.select("#tooltip")
                    .style("display", "none");
            })      


        // adds labels to bars with value of bar
        const labels = svg.selectAll(".labels-text")

            // loads data
            .data(data)
            .enter()

            // appends text
            .append("text")

            // places label at top of bar
            .attr("x", d => xScale(d.name) + margin.left + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.value) + margin.bottom - 20) 

            // anchor label to middle of bar
            .attr("text-anchor", "middle")
            
            // determines label is of the instance's value 
            .text(d => d.value);

        // list of categories
        const cats = ["Fruit", "Vegetable"];
        
        // appends legend's circles
        const legend = svg.selectAll("circle")

            // loads data
            .data(cats)
            .enter()

            // appends circle of category
            .append("circle")

            // places circle in top right corner spaced apart,
            // one below the other
            .attr("cx", 600)
            .attr("cy", (_, i) => 50 + 30 * i)

            // defines circle radius
            .attr("r", 12)

            // fills circle color to be the color o fthe category it's representing
            .attr("fill", (_, i) => color(cats[i]));


        // append's legend's text
        const legendText = svg.selectAll(".legend-text")

            // loads data
            .data(cats)
            .enter()

            // append's legend's text
            .append("text")

            // places next to previously defined adjacent circles
            .attr("x", 620)
            .attr("y", (_, i) => 56 + 30 * i)

            // makes text the name of the given category it's representing
            .text((d, i) => cats[i]);
    
    }); 
        


          
