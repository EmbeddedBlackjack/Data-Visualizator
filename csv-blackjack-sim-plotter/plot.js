/////////////////////////////////////////////////////////////////////
// --- Function defns --- 
// Histogram ploting ------------------------------------------------
//  read and process data
function readCSVHistogramData( iplayer, istrategy ) 
{
    // read from specified player-strategy pair
    var csv_file = "../../Blackjack-Simulator/data_out_stat/player";
    csv_file += ("" + iplayer + "_" + istrategy + ".csv" );
    // AJAX call for CSV data process + plot
    Plotly.d3.csv(csv_file, 
        function(data){ processHistogramData(data) } 
        );
}
function processHistogramData( all_rows ) 
{
    var x = [];
    for (var i=0; i<all_rows.length; i++) {
        row = all_rows[i];
        x.push( row['profit'] );
    }
    console.log( 'process histogram X',x );
    generateHistogramPlotly(x);
}
//  create data for plotting / plot when all data processed
var traces = [];
function generateHistogramPlotly( x )
{
    var trace = {
        type: 'histogram',
        x: x,
        opacity: 0.5,
    };
    traces.push(trace);
    if ( traces.length == 12 ) { makeHistogramPlotly(); }
}
function makeHistogramPlotly()
{
    var plotDiv = document.getElementById("hist-plot-area");
    var layout = {barmode: "overlay"};
    Plotly.newPlot(plotDiv, traces, layout);
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
    //console.log(allRows);
    var val = 0;
    var values = [0,0,0,0,0]; // [2,inft),[1,2),[0,1),[-1,0),(-infy,-1]
    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        val = row['profit'];
        // sort into bins...
        if      (val >  1) { values[0]++ }
        else if (val >  0) { values[1]++ }
        else if (val == 0) { values[2]++ }
        else if (val >=-1) { values[3]++ }
        else               { values[4]++ }
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

/////////////////////////////////////////////////////////////////////
// --- MAIN CODE HERE --- 
//  plot 12 strategies for player0
histogram_data = [];
for (var i=0; i<12; i++) {
    readCSVHistogramData(0,i); // new dataset
}


makePieChart();
