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
    generateHistogramPlotly(x);
}
//  create data for plotting / plot when all data processed
var traces_his = [];
function generateHistogramPlotly( x )
{
    var trace = {
        type: 'histogram',
        x: x,
        opacity: 0.5,
    };
    traces_his.push(trace);
    if ( traces_his.length == 12 ) { makeHistogramPlotly(); }
}
function makeHistogramPlotly()
{
    var plotDiv = document.getElementById("hist-plot-area");
    var layout = {barmode: "overlay"};
    Plotly.newPlot(plotDiv, traces_his, layout);
}

// Box ploting ------------------------------------------------------
//  read and process data
function readCSVBoxData( iplayer, istrategy ) 
{
    // read from specified player-strategy pair
    var csv_file = "../../Blackjack-Simulator/data_out_stat/player";
    csv_file += ("" + iplayer + "_" + istrategy + ".csv" );
    // AJAX call for CSV data process + plot
    Plotly.d3.csv(csv_file, 
        function(data){ processBoxData(data) } 
        );
}
function processBoxData( all_rows ) 
{
    var x = [];
    for (var i=0; i<all_rows.length; i++) {
        row = all_rows[i];
        x.push( row['profit'] );
    }
    generateBoxPlotly(x);
}
//  create data for plotting / plot when all data processed
var traces_box = [];
function generateBoxPlotly( x )
{
    var trace = {
        type: 'box',
        name: (""+traces_box.length),
        x: x,
        boxmean: 'sd',
        boxpoints: false,
    };
    traces_box.push(trace);
    if ( traces_box.length == 12 ) { makeBoxPlotly(); }
}
function makeBoxPlotly()
{
    var plotDiv = document.getElementById("box-plot-area");
    var layout = {};
    Plotly.newPlot(plotDiv, traces_box, layout);
}

/////////////////////////////////////////////////////////////////////
// --- MAIN CODE HERE --- 
//  plot 12 strategies for player0

for (var i=0; i<12; i++) {
    // new dataset
    readCSVHistogramData(0,i);  // histogram
    readCSVBoxData(0,i);        // box
}

