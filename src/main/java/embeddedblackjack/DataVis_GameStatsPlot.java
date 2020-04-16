package embeddedblackjack;

import java.io.IOException;

import tech.tablesaw.api.DoubleColumn;
import tech.tablesaw.api.Table;
import tech.tablesaw.io.csv.CsvReadOptions;
import tech.tablesaw.plotly.Plot;
//import tech.tablesaw.plotly.api.Histogram;
import tech.tablesaw.plotly.components.Figure;
import tech.tablesaw.plotly.components.Layout;
import tech.tablesaw.plotly.traces.HistogramTrace;

/**
 * 
 */
public class DataVis_GameStatsPlot {

    public static void main(String[] args) throws IOException {

        // Load data from Blackjack-Simulator -----------------------
        String sim_path = "C:\\Users\\munis\\Documents\\_code\\EmbeddedBlackjack\\Blackjack-Simulator\\";
        String csv_data_path = sim_path + "data_out_stat\\";

        // Plot data as Histogram -----------------------------------
        double[] tmp = {}; // need so Java compiler doesn't complain
        HistogramTrace trace0 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace1 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace2 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace3 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace4 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace5 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace6 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace7 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace8 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace9 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace10 = HistogramTrace.builder(tmp).build();
        HistogramTrace trace11 = HistogramTrace.builder(tmp).build();
        for (int i=0; i<12; i++) {
            // Set csv data location
            String csv_file = csv_data_path + ("player0_" + i + ".csv");

            // Set csv data properties
            CsvReadOptions.Builder builder =
                    CsvReadOptions.builder(csv_file)
                            .separator(',')         // table is comma-delimited
                            .header(true);          // header is first row
            CsvReadOptions options = builder.build();

            // Read csv data file
            Table game_results = Table.read().usingOptions(options);
            DoubleColumn col = game_results.doubleColumn("profit");
            int col_size = col.size();
            double[] dcol = new double[col_size];
            for (int cnt=0; cnt<col_size; cnt++) { 
                dcol[cnt] = col.getDouble(cnt); 
            }

            // Fit data to Histogram
            switch(i) {
                case 0: trace0 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 1: trace1 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 2: trace2 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 3: trace3 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 4: trace4 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 5: trace5 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 6: trace6 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 7: trace7 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 8: trace8 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 9: trace9 = HistogramTrace.builder(dcol).opacity(0.75).build(); break;
                case 10:trace10 = HistogramTrace.builder(dcol).opacity(0.75).build();break;
                case 11:trace11 = HistogramTrace.builder(dcol).opacity(0.75).build();break;
            }
            
            //Plot.show(Histogram.create("Player0-" + i + " profit distribution", game_results, "profit"));
        }

        // Generate plot in plot.ly web page ------------------------
        // make html file with js code
        Layout layout = Layout.builder()
            .barMode(Layout.BarMode.OVERLAY)
            .build();
        Plot.show(new Figure(layout, trace0,trace1,trace2,trace3,
                                trace4,trace5,trace6,trace7,
                                trace8,trace9,trace10,trace11));

    }
}
