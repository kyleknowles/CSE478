
//https://www.kaggle.com/code/blueblowfish/nfl-data-analysis/input

// Initialize global data that stores my objects
let data = []
var data2 = []

const barWidth = 10; // Global variable for barWidth

// Current values of height fields
var currSort = "Small"; 
var posFilter = "All";
var currTeam = "All"

// Current values of weight fields
var currSort2 = "Small";
var posFilter2 = "All";
var currTeam2 = "All"

    // Parses csv file
    fetch("Basic_Stats.csv")
        .then(response => response.text())
        .then(csv => {
                let rows = csv.split("\n");
                let headers = rows[0].split(",");
                data = rows.slice(1).map(row => {
                let values = row.split(/,(?! )(?<! )/);
                
                    return headers.reduce((obj, key, i) => {
                        // Creates objects of instance, key pairs
                        obj[key] = values[i]

                        // Creates new feature based on condensed position names
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
                });
                return data
            })
            // Creates svg graphs
            .then (data => {
                
                // Initial sort of height data from smallest to largest
                data.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);
                // Initial call to height svg chart
                updateChart(data);

                // Clone data, so it doesn't interfere with the other variable
                data2 = structuredClone(data);
                
                // Initial sort of height data from smallest to largest
                data2.sort((a, b) =>  a["Weight (lbs)"] - b["Weight (lbs)"]);

                // Initial call to weight svg chart
                weightChart(data2);

                // Filter for smallest to largest vs largest to smalelst
                d3.select("#sortBy").on("change", (event) => {
                    const selected = event.target.value;
                   
                    var filtered = data;
                
                    // Make sure other filters still in place 
                    if (posFilter != "All") {
                        filtered = data.filter(d => d["Pos_Short"] == posFilter);
                    }
                   
                    // Sorts based on fitler id
                    if (selected == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);
                    } else if (selected == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Height (inches)"] - a["Height (inches)"]);
                    }

                    // Save values so other filters can know how to stay in play
                    currSort = selected;
                    
                     // Make sure other filters still in place 
                    if (currTeam != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == currTeam);
                    }
                    
                    updateChart(filtered);
                })

                 // Filter for position
                d3.select("#sortPosShort").on("change", (event) => {
                    const selected = event.target.value;

                    var filtered = data;

                     // Sorts based on position
                    if (selected != "All") {
                        filtered = data.filter(d => d["Pos_Short"] == selected);
                    }

                    posFilter = selected;

                     // Make sure other filters still in place 
                    if (currSort == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);
                    } else if (currSort == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Height (inches)"] - a["Height (inches)"]);
                    }

                     // Make sure other filters still in place 
                    if (currTeam != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == currTeam);
                    }

                    updateChart(filtered);
                })
                
                // Filter for team
                d3.select("#team").on("change", (event) => {
                    const selected = event.target.value;
                    var filtered = data

                     // Make sure other filters still in place 
                    if (posFilter != "All") {
                        filtered = data.filter(d => d["Pos_Short"] == posFilter);
                    }
    
                     // Make sure other filters still in place 
                    if (currSort == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Height (inches)"] - b["Height (inches)"]);
                    } else if (currSort == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Height (inches)"] - a["Height (inches)"]);
                    }

                    // Filters based on team
                    if (selected != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == selected);
                    }
                   

                    currTeam = selected;

                    updateChart(filtered)
                })

                // Sorts weight based on smallest to largest or largest to smallest
                d3.select("#sortBy2").on("change", (event) => {
                    const selected = event.target.value;
                   
                    var filtered = data2;
                
                     // Make sure other filters still in place 
                    if (posFilter2 != "All") {
                        filtered = data2.filter(d => d["Pos_Short"] == posFilter2);
                    }
                   
                    // Sorts by weight size
                    if (selected == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Weight (lbs)"] - b["Weight (lbs)"]);
                    } else if (selected == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Weight (lbs)"] - a["Weight (lbs)"]);
                    }

                    currSort2 = selected;
                    
                     // Make sure other filters still in place 
                    if (currTeam2 != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == currTeam2);
                    }
                    
                    weightChart(filtered);
                })

                // Filter based on position for weight
                d3.select("#sortPosShort2").on("change", (event) => {
                    const selected = event.target.value;

                    var filtered = data2;

                    // Filters based on position
                    if (selected != "All") {
                        filtered = data2.filter(d => d["Pos_Short"] == selected);
                    }

                    posFilter2 = selected;

                     // Make sure other filters still in place 
                    if (currSort2 == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Weight (lbs)"] - b["Weight (lbs)"]);
                    } else if (currSort2 == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Weight (lbs)"] - a["Weight (lbs)"]);
                    }

                     // Make sure other filters still in place 
                    if (currTeam2 != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == currTeam2);
                    }

                    weightChart(filtered);
                })

                // Filters based on team for weight
                d3.select("#team2").on("change", (event) => {
                    const selected = event.target.value;
                    var filtered = data2

                    // Make sure other filters still in place 
                    if (posFilter2 != "All") {
                        filtered = data2.filter(d => d["Pos_Short"] == posFilter2);
                    }
    
                    // Make sure other filters still in place 
                    if (currSort2 == "Small") {
                        filtered = filtered.sort((a, b) =>  a["Weight (lbs)"] - b["Weight (lbs)"]);
                    } else if (currSort2 == "Large") {
                        filtered = filtered.sort((a, b) =>  b["Weight (lbs)"] - a["Weight (lbs)"]);
                    }

                    // Filters based on team
                    if (selected != "All") {
                        filtered = filtered.filter(d => d["Current Team"] == selected);
                    }
                   

                    currTeam2 = selected;

                    weightChart(filtered)
                })

                
            });


            // Updates chart for Height
            function updateChart(data) {
                // Removes bad values, not active players are missing team and position
                data = data.filter(d => d["Height (inches)"] > 0);
                data = data.filter(d => d["Current Status"] == "Active");

                // Selects svg tag 1
                const svg = d3.select("#svg1");

                // Clears previous svg above it
                svg.selectAll("*").remove(); 
        
                
    
                // Finds the max value of Height
                const maxHeight = Math.max(...data.map(d => d["Height (inches)"])); 
                // Finds the min value of Height
                const minHeight = Math.min(...data.map(d => d["Height (inches)"]));
            
                /*
                const yScale = d3.scaleLinear()
                    .domain([minHeight + 1, maxHeight])
                    .range([0, 100]);        
                */
        
                // sets constant for svg bars
                const heightConstant = 20
                const minHeightBar = 3
                
                // Draws svg bars, creating the bar plot
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
                        // Parses name to get Firstname LastName Form
                        let nameList = d["Name"].split(",")
                        let firstName = nameList[1].replace('"', "")
                        let lastName = nameList[0].replace('"', "")
                        var playerNumber = "";
                        // See's if player has valid number value
                        if (String(d["Number"]) != "") {
                             playerNumber = "(#" + String(d["Number"]) + ")";
                        }
                        d3.select(this) 
                            // Fill lightblue on hover
                            .style("fill", "lightblue")
                        d3.select("#tooltip")
                            // Shows tooltip details on hover
                            .style("display", "block")
                            .html(`${firstName} ${lastName} ${playerNumber}<br>${d["Current Team"]} ${d["Position"]}<br>Height: ${d["Height (inches)"]} inches`);
                    })
                    // Back to default values off of hover
                    .on("mouseout", function(event, d) {
                        d3.select(this)
                            .style("fill", "steelblue")
                        d3.select("#tooltip")
                        
                            .style("display", "none")
                        
                    })      

            }


            // Creates weight chart
            function weightChart(data) {
                // Gets rid of bad values
                data = data.filter(d => d["Weight (lbs)"] > 0);
                data = data.filter(d => d["Current Status"] == "Active");

                // Creates svg box
                const svg = d3.select("#svg2");

                // Writes over previous svg box
                svg.selectAll("*").remove(); 
                
            
                // Finds the max value of Weight
                const maxWeight = Math.max(...data.map(d => d["Weight (lbs)"])); 
                // Finds the min value of Weight
                const minWeight = Math.min(...data.map(d => d["Weight (lbs)"])); 
            
                /*
                const yScale = d3.scaleLinear()
                    .domain([minWeight + 1, maxWeight])
                    .range([0, 100]);        
                */
            
                // COnstant values for boxplot
                const weightConstant = 1.8
                const minWeightBar = 8
            
                // Creates boxplot
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
                        // Parses name to get Firstname Lastname Form
                        let nameList = d["Name"].split(",")
                        let firstName = nameList[1].replace('"', "")
                        let lastName = nameList[0].replace('"', "")

                        // See's if player has valid number value
                        var playerNumber = "";
                        if (String(d["Number"]) != "") {
                             playerNumber = "(#" + String(d["Number"]) + ")";
                        }
                        // Highlights box when hovered over
                        d3.select(this) 
                            .style("fill", "lavender")
                        
                         // Displays player data when hovered over
                        d3.select("#tooltip2")
                        
                            .style("display", "block")
                            .html(`${firstName} ${lastName} ${playerNumber}<br>${d["Current Team"]} ${d["Position"]}<br>Weight: ${d["Weight (lbs)"]} pounds`);
                    })

                    // Player data and highlight goes away when no longer hovering over box
                    .on("mouseout", function(event, d) {
                        d3.select(this)
                            .style("fill", "purple")
                        d3.select("#tooltip2")
                        
                            .style("display", "none")
                        
                    })

            }


        
