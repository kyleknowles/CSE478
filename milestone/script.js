
                            
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
                        
                        obj[key] = isNaN(values[i]) ? 0 : values[i]
                        return obj; }, {});
                        //data.append(dict);
                });
                return data
            })
            .then (data => {
               // alert(data)
               //alert("Hello")
                
                
                //alert("Before d3")
                const svg = d3.select("svg");
                //alert("Pass d3.select(svg)")
                const barWidth = 40;
                


                
                data = data.filter(d => d.Age >= 0 && d.Age <= 100);
                data.sort((a, b) => b.Age - a.Age);

                const maxAge = Math.max(...data.map(d => d.Age)); // Find the max value of Age

                const yScale = d3.scaleLinear()
                    .domain([0, maxAge])
                    .range([0, 100]);        
               

                alert(maxAge)
                const bars = svg.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", (d, i) => i * (barWidth + 5))
                    .attr("y", d => maxAge - d.Age)
                    .attr("width", barWidth)
                    .attr("height", d => d.Age)
                    .attr("fill", "steelblue")
            });
