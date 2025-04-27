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

        
        
        const margin = {top: 50, right: 100, bottom: 20, left: 40}
        const chart = svg.append("g")
            .attr("transform", `translate(${margin.right}, ${margin.top})`);


        const maxValue = Math.max(...data.map(d => d.value)); 

        const xScale = d3.scaleBand()
            .domain([...new Set(data.map(d => d.name))])
            .range([0, 800])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, 22])
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

        const labels = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")

            .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
            .attr("y", d => 450 - yScale(d.value) + 3) // + 6 * d.name.length
            //.attr("transform", d => `rotate(90, ${xScale(d.name) + xScale.bandwidth() / 2 - 4}, ${450 - yScale(d.value) +  6 * d.name.length})`)
            .attr("text-anchor", "middle")
            
            //.text(d => d.name);
            .text(d => d.value);

        const cats = ["Fruit", "Vegetable"]
        const legend = svg.selectAll("circle")
            .data(cats)
            .enter()
            .append("circle")
            .attr("cx", 400)
            .attr("cy", (_, i) => 100 + 30 * i)
            .attr("r", 12)
            .attr("fill", "blue");
    }); 
        


                        /*
                        

                7. Create a legend that maps colors to categories.

                        */
