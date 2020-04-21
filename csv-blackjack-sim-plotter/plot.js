/* --- Function defns --- */
// Histogram ploting ------------------------------------------------
function makeHistogram() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("../../Blackjack-Simulator/data_out_stat/player0_0.csv", 
        function(data){ processHistogramData(data) } 
        );
}
function processHistogramData( allRows ) 
{
    console.log(allRows);
    var x = [];
    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        x.push( row['profit'] );
    }
    console.log( 'X',x );
    makeHistogramPlotly( x );
}
function makeHistogramPlotly( x ){
    var plotDiv = document.getElementById("hist-plot-area");
    var traces = [{
      x: x,
      type: 'histogram',
      opacity: 0.5,
      xbins: {
        end: 4,
        size: 1,
        start: -4
      }
    }];
    Plotly.newPlot(plotDiv, traces);
}

// Pie chart ploting ------------------------------------------------
function makePieChart() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("../../Blackjack-Simulator/data_out_stat/player0_0.csv", 
        function(data){ processPieData(data) } 
        );
}
function processPieData( allRows ) 
{
    console.log(allRows);
    var val = 0;
    var values = [0,0,0,0,0]; // [2,inft),[1,2),[0,1),[-1,0),(-infy,-1]
    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        val = row['profit'];
        if      (val >  1) { values[0]++ }
        else if (val >  0) { values[1]++ }
        else if (val == 0) { values[2]++ }
        else if (val >=-1) { values[3]++ }
        else               { values[4]++ }
        // sort into bins...
        console.log( 'VAL',val );
    }
    makePiePlotly( values );
}
function makePiePlotly( values ){
    var plotDiv = document.getElementById("pie-plot-area");
    var data = [{
        type: 'pie',
        values: values,
        labels: ["(1,inft)","(0,1]","0","[-1,0)","(-infy,-1)"],
        textinfo: "label+percent",
        textposition: "outside",
        automargin: true
    }];
    var layout = {
        height: 400,
        width: 500
    };
    Plotly.newPlot(plotDiv, data, layout);
}

//-------------------------------------------------------------------
/* --- MAIN CODE HERE --- */
makeHistogram();
makePieChart();

// Current Plotly.js version
console.log( Plotly.BUILD );