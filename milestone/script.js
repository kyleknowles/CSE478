
                            
    let data = []
    fetch("Basic_Stats.csv")
        .then(response => response.text())
        .then(csv => {
                let rows = csv.split("\n");
                let headers = rows[0].split(",");
                data = rows.slice(1).map(row => {
                let values = row.split(/,(?! )(?<! )/);
                //dict = {}
                    return headers.reduce((obj, key, i) => {
                        
                        obj[key] = values[i]
                        return obj; }, {});
                        //data.append(dict);
                });
                return data
            })
            .then (data => {
               // alert(data)
               //alert("Hello")
                
                
                //alert("Before d3")
                const svg = d3.select("#svg1");
                //alert("Pass d3.select(svg)")
                const barWidth = 40;
                
                data = data.filter(d => d["Height (inches)"] > 0);
                //data = data.filter(d => d["Current Status"] == Active);
                

                data.sort((a, b) => b["Height (inches)"] - a["Height (inches)"]);

                const maxHeight = Math.max(...data.map(d => d["Height (inches)"])); // Find the max value of Height
                const minHeight = Math.min(...data.map(d => d["Height (inches)"])); // Find the min value of Height

                const yScale = d3.scaleLinear()
                    .domain([minHeight + 1, maxHeight])
                    .range([0, 100]);        
                
                //alert(maxHeight)

                const heightConstant = 20

                const bars = svg.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", (d, i) => i * (barWidth + 5))
                    .attr("y", d => (maxHeight - d["Height (inches)"]) *  heightConstant)
                    .attr("width", barWidth)
                    .attr("height", d => (d["Height (inches)"] - minHeight + 3) *  heightConstant)
                    .attr("fill", "steelblue")
                    .on("mouseover", function(event, d) {
                        d3.select("#tooltip")
                            .style("display", "block")
                            .html(`${d["Name"]}<br>Height: ${d["Height (inches)"]}"`);
                    })


                const svg2 = d3.select("#svg2");
                  
                
                
                data.sort((a, b) => b["Weight (lbs)"] - a["Weight (lbs)"]);
                //data = data.filter(d => d["Current Status"] == Active);
                    

                const maxWeight = Math.max(...data.map(d => d["Weight (lbs)"])); // Find the max value of Weight
                const minWeight = Math.min(...data.map(d => d["Weight (lbs)"])); // Find the min value of Weight
                
                     
            
                alert("Hello")

                const weightConstant = 20

                bars = svg2.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * (barWidth + 5))
                .attr("y", d => (maxWeight - d["Weight (lbs)"]) *  weightConstant)
                .attr("width", barWidth)
                .attr("height", d => (d["Weight (lbs)"] - minWeight + 3) *  weightConstant)
                .attr("fill", "steelblue")
                .on("mouseover", function(event, d) {
                    d3.select("#tooltip")
                        .style("display", "block")
                        .html(`${d["Name"]}<br>Weight: ${d["Weight (lbs)"]}"`);
                })
                
            });

            
