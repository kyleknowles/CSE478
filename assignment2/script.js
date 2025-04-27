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
            .range(["steelblue", "red"])

        /*
        const chart = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`
        );
        */

        const maxValue = Math.max(...data.map(d => d.value)); 

        const xScale = d3.scaleBand()
            .domain(["Fruit", "Vegetable"])
            
            .range([0,800])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0,maxValue])
            .range([450, 0]);


        


        const bars = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            alert("1")
            .attr("x", (d, i) => i * (barWidth + (barWidth/2)))
            //.attr("x", d => xScale(d.category))
            //.attr("y", d => yScale(d.value))
            alert("2")
            .attr("width", xScale.bandwidth())
            alert("3")
            .attr("height", d => yScale(d.value))
            alert("4")

            //.attr("x", (d, i) => i * (barWidth + (barWidth/2)))
            //.attr("y", d => 450 - d.value)
            //.attr("width", barWidth)     
            //.attr("height", d.value)

            .attr("fill", d => color(d.category));
            alert("5")
    });

            //.text(d => d.name)


                        /*
                        
                2. Create a margin convention and append a g group to the SVG canvas.
                3. Build a band scale for the x-axis and a linear scale for the y-axis.
                4. Render a bar for each item using the enter-update pattern.
                5. Use a color scale (e.g., d3.scaleOrdinal) to fill bars based on category.
                6. Add value labels above or inside each bar.
                7. Create a legend that maps colors to categories.
                8. Rotate x-axis labels for readability if they overlap.

                        */
   // });
