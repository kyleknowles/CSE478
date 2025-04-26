
    
let data = []
var data2 = []
const barWidth = 10;
var currSort = "Small";
var posFilter = "All";
var currTeam = "All"

var currSort2 = "Small";
var posFilter2 = "All";
var currTeam2 = "All"

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
                            } else if ((values[i] == "RB") || (values[i] == "P")) {
                                obj["Pos_Short"] = "Running Back / Full Back"; 
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
                updateChart(data);

                data2 = structuredClone(data);
                
                data2.sort((a, b) =>  a["Weight (lbs)"] - b["Weight (lbs)"]);
                weightChart(data2);

                d3.select("#sortBy").on("change", (event) => {
                    const selected = event.target.value;
                   
                    var filtered = data;
                
                    if (posFilter != "All") {
                        filtered = data.filter(d => d["Pos_Short"] == posFilter);
                    }
                   

                    if (selected == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);
                    } else if (selected == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Height (inches)"] - a["Height (inches)"]);
                    }

                    currSort = selected;
                    
                    if (currTeam != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == currTeam);
                    }
                    
                    updateChart(filtered);
                })

                d3.select("#sortPosShort").on("change", (event) => {
                    const selected = event.target.value;

                    var filtered = data;

                    if (selected != "All") {
                        filtered = data.filter(d => d["Pos_Short"] == selected);
                    }

                    posFilter = selected;

                    if (currSort == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);
                    } else if (currSort == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Height (inches)"] - a["Height (inches)"]);
                    }

                    if (currTeam != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == currTeam);
                    }

                    updateChart(filtered);
                })
                d3.select("#team").on("change", (event) => {
                    const selected = event.target.value;
                    var filtered = data

                    if (posFilter != "All") {
                        filtered = data.filter(d => d["Pos_Short"] == posFilter);
                    }
    
                    if (currSort == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);
                    } else if (currSort == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Height (inches)"] - a["Height (inches)"]);
                    }

                    if (selected != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == selected);
                    }
                   

                    currTeam = selected;

                    updateChart(filtered)
                })
                d3.select("#sortBy2").on("change", (event) => {
                    const selected = event.target.value;
                   
                    var filtered = data2;
                
                    if (posFilter2 != "All") {
                        filtered = data2.filter(d => d["Pos_Short"] == posFilter2);
                    }
                   

                    if (selected == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Weight (lbs)"] - b["Weight (lbs)"]);
                    } else if (selected == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Weight (lbs)"] - a["Weight (lbs)"]);
                    }

                    currSort2 = selected;
                    
                    if (currTeam2 != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == currTeam2);
                    }
                    
                    weightChart(filtered);
                })

                d3.select("#sortPosShort2").on("change", (event) => {
                    const selected = event.target.value;

                    var filtered = data2;

                    if (selected != "All") {
                        filtered = data2.filter(d => d["Pos_Short"] == selected);
                    }

                    posFilter2 = selected;

                    if (currSort2 == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Weight (lbs)"] - b["Weight (lbs)"]);
                    } else if (currSort2 == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Weight (lbs)"] - a["Weight (lbs)"]);
                    }

                    if (currTeam2 != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == currTeam2);
                    }

                    weightChart(filtered);
                })
                d3.select("#team2").on("change", (event) => {
                    const selected = event.target.value;
                    var filtered = data2

                    if (posFilter2 != "All") {
                        filtered = data2.filter(d => d["Pos_Short"] == posFilter2);
                    }
    
                    if (currSort2 == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Weight (lbs)"] - b["Weight (lbs)"]);
                    } else if (currSort2 == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Weight (lbs)"] - a["Weight (lbs)"]);
                    }

                    if (selected != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == selected);
                    }
                   

                    currTeam2 = selected;

                    weightChart(filtered)
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
            
                const heightConstant = 20
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
                            .html(`${firstName} ${lastName} (# ${d[Number]})<br>${d["Current Team"]} ${d["Position"]}<br>Height: ${d["Height (inches)"]} inches`);
                    })
                    .on("mouseout", function(event, d) {
                        d3.select(this)
                            .style("fill", "steelblue")
                        d3.select("#tooltip")
                        
                            .style("display", "none")
                        
                    })

            }


                
            


            function weightChart(data) {
                data = data.filter(d => d["Weight (lbs)"] > 0);
                data = data.filter(d => d["Current Status"] == "Active");
                const svg = d3.select("#svg2");
                svg.selectAll("*").remove(); 
                
            
            
                const maxWeight = Math.max(...data.map(d => d["Weight (lbs)"])); // Find the max value of Weight
                const minWeight = Math.min(...data.map(d => d["Weight (lbs)"])); // Find the min value of Weight
            
                const yScale = d3.scaleLinear()
                    .domain([minWeight + 1, maxWeight])
                    .range([0, 100]);        

            
                const weightConstant = 1.8
                const minWeightBar = 8
            
                const bars = svg.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", (d, i) => i * (barWidth + (barWidth/2)))
                    .attr("y", d => (400 - (d["Weight (lbs)"] - minWeight + minWeightBar) * weightConstant)) 
                    .attr("width", barWidth)
                    .attr("height", d => (d["Weight (lbs)"] - minWeight + minWeightBar) * weightConstant)
                    .attr("fill", "purple")
                    .on("mouseover", function(event, d) {
                        let nameList = d["Name"].split(",")
                        let firstName = nameList[1].replace('"', "")
                        let lastName = nameList[0].replace('"', "")
                        var playerNumber = "";
                        if (d["Number"] != "") {
                             playerNumber = "(#" + String(d["Number"]) + ")";
                        }

                        d3.select(this) 
                            .style("fill", "lavender")
                        d3.select("#tooltip2")
                        
                            .style("display", "block")
                            .html(`${firstName} ${lastName} (# ${d["Number"]})<br>${d["Current Team"]} ${d["Position"]}<br>Weight: ${d["Weight (lbs)"]} pounds`);
                    })
                    .on("mouseout", function(event, d) {
                        d3.select(this)
                            .style("fill", "purple")
                        d3.select("#tooltip2")
                        
                            .style("display", "none")
                        
                    })

            }


        
