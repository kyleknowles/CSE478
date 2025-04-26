
    
let data = []
let data2 = []
const barWidth = 10;

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
                        if (key == "Position") {
                            if ((values[i] == "FS") || (values[i] == "SAF") || (values[i] == "SS") || (values[i] == "DB") || (values[i] == "CB")) {
                                obj["Pos_Short"] = "Defensive Back";
                            } else if ((values[i] == "LB") || (values[i] == "OLB") || (values[i] == "ILB") || (values[i] == "MLB") || (values[i] == "DE") ) {
                                obj["Pos_Short"] = "Defensive Line";
                            } else if ((values[i] == "OL") || (values[i] == "OT") || (values[i] == "T") || (values[i] == "NT") || (values[i] == "OG") || (values[i] == "G") || (values[i] == "C")) {
                                obj["Pos_Short"] = "Offensive Line";
                            } else if ((values[i] == "K") || (values[i] == "P") || (values[i] == "LS") ) {
                                obj["Pos_Short"] = "Special Teams";
                            } else if ((values[i] == "RB") || (values[i] == "P") || (values[i] == "LS") ) {
                                obj["Pos_Short"] = "Running Back/ Full Back"; 
                            } else if ((values[i] == "WR") || (values[i] == "TE")) {
                                obj["Pos_Short"] = "Receiver"; 
                            } else if (values[i] == "QB") {
                                obj["Pos_Short"] = "Quarterback"; 
                            }
                        }


                        return obj; }, {});
                        //data.append(dict);
                });
                return data
            })
            .then (data => {
                data.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);
                updateChart(data)
                d3.select("#sortBy").on("change", (event) => {
                    const selected = event.target.value;
                    //alert(selected)
                    var sorted = data;
                    
                    if (selected == "Small") {
                        sorted = data.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);
                    } else if (selected == "Large") {
                        sorted = data.sort((a, b) =>  b["Height (inches)"] - a["Height (inches)"]);
                    }
                    
                    
                    updateChart(sorted);
                })
                d3.select("#sortPosShort").on("change", (event) => {
                    const selected = event.target.value;
                    const filtered = data.filter(d => d["Pos_Short"] == selected)
                    updateChart(filtered)
                })

                
            });


            function updateChart(data) {
                data = data.filter(d => d["Height (inches)"] > 0);
                data = data.filter(d => d["Current Status"] == "Active");
                const svg = d3.select("#svg1");
                svg.selectAll("*").remove(); 
            
                //let data2 = data
                
                //data = data.filter(d => d["Current Status"] == Active);
                
            
                
            
                const maxHeight = Math.max(...data.map(d => d["Height (inches)"])); // Find the max value of Height
                const minHeight = Math.min(...data.map(d => d["Height (inches)"])); // Find the min value of Height
            
                const yScale = d3.scaleLinear()
                    .domain([minHeight + 1, maxHeight])
                    .range([0, 100]);        
                
                //alert(maxHeight)
            
                const heightConstant = 18
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
                        let nameList = d["Name"].split(",")
                        let firstName = nameList[1].replace('"', "")
                        let lastName = nameList[0].replace('"', "")
                        d3.select(this) 
                            .style("fill", "lightblue")
                        d3.select("#tooltip")
                        
                            .style("display", "block")
                            .html(`${firstName} ${lastName}<br>${d["Current Team"]} ${d["Position"]}<br>Height: ${d["Height (inches)"]} inches`);
                    })
                    .on("mouseout", function(event, d) {
                        d3.select(this)
                            .style("fill", "steelblue")
                        d3.select("#tooltip")
                        
                            .style("display", "none")
                        
                    })

            }


                
                /*


                function weightChart() {
                    
                    const svg2 = d3.select("#svg2");
                    
                    svg2.selectAll("*").remove(); 

                    data = data.filter(d => d["Weight (lbs)"] > 1);
                   
                    //data = data.filter(d => d["Current Status"] == Active);
                    

                    const maxWeight = Math.max(...data.map(d => d["Weight (lbs)"])); // Find the max value of Weight
                    const minWeight = Math.min(...data.map(d => d["Weight (lbs)"])); // Find the min value of Weight
                    
                    

                    const weightConstant = 1.5
                    const minWeightBar = 3
                    
                    const bars2 = svg2.selectAll("rect")
                    
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", (d, i) => i * (barWidth +  (barWidth/2)))
                    .attr("y", d => (400 - (d["Weight (lbs)"] - minWeight + minWeightBar) * weightConstant)) 
                    .attr("width", barWidth)
                    .attr("height", d => (d["Weight (lbs)"] - minWeight + minWeightBar) * weightConstant)
                    .attr("fill", "steelblue")

                    let nameList = d["Name"].split(",")
                    let firstName = nameList[1].replace('"', "")
                    let lastName = nameList[0].replace('"', "")
                    
                    .on("mouseover", function(event, d) {
                        d3.select(this) 
                            .style("fill", "red")

                        d3.select("#tooltip")
                            .style("display", "block")
                            .html(`${firstName} ${lastName}<br> ${d["Current Status"]} ${d["Current Team"]}<br> ${d["Position"]}<br>Weight: ${d["Weight (lbs)"]} lbs`);
                    })
                }
            
                function lightHeavy() {
                    data.sort((a, b) =>  a["Weight(lbs)"] - b["Weight(lbs)"]);
                    weightChart();
                }
                
                function HeavyLight() {
                   
                    data.sort((a, b) =>  b["Weight(lbs)"] - a["Weight(lbs)"]);
                    
                    weightChart();
                }
                    */
        
