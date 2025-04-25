
                            
    //let data = []
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
               
                const svg = d3.select("#svg1");
                
                const barWidth = 10;

                let data2 = data
                data = data.filter(d => d["Height (inches)"] > 0);
                //data = data.filter(d => d["Current Status"] == Active);
                

                data.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);

                const maxHeight = Math.max(...data.map(d => d["Height (inches)"])); // Find the max value of Height
                const minHeight = Math.min(...data.map(d => d["Height (inches)"])); // Find the min value of Height

                const yScale = d3.scaleLinear()
                    .domain([minHeight + 1, maxHeight])
                    .range([0, 100]);        
                
                //alert(maxHeight)

                const heightConstant = 8
                const minHeightBar = 3

                const bars = svg.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", (d, i) => i * (barWidth + (barWidth/2)))
                    .attr("y", d => (400 - (d["Height (inches)"] - minHeight + minHeightBar) * heightConstant)) 
                    .attr("width", barWidth)
                    .attr("height", d => (d["Height (inches)"] - minHeight + minHeightBar) * heightConstant)
                    .attr("fill", "steelblue")
                    .on("mouseover", function(event, d) {
                        d3.select("#tooltip")
                            .style("display", "block")
                            let nameList = d["Name"].split(",")
                            let firstName = nameList[1].replace('"', "")
                            let lastName = nameList[0].replace('"', "")
                            .html(`${firstName}<br> ${lastName}} ${d["Current Team"]}<br> ${d["Position"]}<br>Height: ${d["Height (inches)"]} inches`);
                    })


                const svg2 = d3.select("#svg2");
                
                data2 = data2.filter(d => d["Weight (lbs)"] > 1);
                data2.sort((a, b) => b["Weight (lbs)"] - a["Weight (lbs)"]);
                //data = data.filter(d => d["Current Status"] == Active);
                    

                const maxWeight = Math.max(...data2.map(d => d["Weight (lbs)"])); // Find the max value of Weight
                const minWeight = Math.min(...data2.map(d => d["Weight (lbs)"])); // Find the min value of Weight
                
                

                const weightConstant = 1.5
                const minWeightBar = 3
                
                const bars2 = svg2.selectAll("rect")
                .data(data2)
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * (barWidth +  (barWidth/2)))
                .attr("y", d => (400 - (d["Weight (lbs)"] - minWeight + minWeightBar) * weightConstant)) 
                .attr("width", barWidth)
                .attr("height", d => (d["Weight (lbs)"] - minWeight + minWeightBar) * weightConstant)
                .attr("fill", "steelblue")
    
                .on("mouseover", function(event, d) {
                    d3.select("#tooltip")
                        .style("display", "block")
                        .html(`${d["Name"]}<br> ${d["Current Status"]} ${d["Current Team"]}<br> ${d["Position"]}<br>Weight: ${d["Weight (lbs)"]} lbs`);
                })
                    
                
            });

            
