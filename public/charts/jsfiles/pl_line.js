		Plotly.d3.csv('/../../data/pl_line.csv', function(rows){
		    var trace = {
		      type: 'scatter',                    // set the chart type
		      mode: 'lines',                      // connect points with lines
		      x: rows.map(function(row){          // set the x-data
		        return row['Time'];
		      }),
		      y: rows.map(function(row){          // set the x-data
		        return row['X10.Min.Sampled.Avg'];
		      }),
		      line: {                             // set the width of the line.
		        width: 1
		      },
		      error_y: {
		        array: rows.map(function(row){    // set the height of the error bars
		          return row['X10.Min.Std.Dev'];
		        }),
		        thickness: 0.5,                   // set the thickness of the error bars
		        width: 0
		      }
		    };

		    var layout = {
		      yaxis: {title: "Wind Speed"},       // set the y axis title
		      xaxis: {
		        showgrid: false,                  // remove the x-axis grid lines
		        tickformat: "%B, %Y"              // customize the date format to "month, day"
		      },
		      margin: {                           // update the left, bottom, right, top margin
		        l: 40, b: 30, r: 10, t: 20
		      }
		    };

		    Plotly.plot(document.getElementById('my-graph'), [trace], layout, {showLink: false});
		});
