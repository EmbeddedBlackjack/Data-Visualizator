package embeddedblackjack;

import java.io.IOException;

import tech.tablesaw.api.Table;
import tech.tablesaw.io.csv.CsvReadOptions;
import tech.tablesaw.plotly.Plot;
import tech.tablesaw.plotly.api.Histogram;

/**
 * 
 */
public class DataVis_GameStatsPlot {

    public static void main(String[] args) throws IOException {

        // Load data from Blackjack-Simulator
        String sim_path = "C:\\Users\\munis\\Documents\\_code\\EmbeddedBlackjack\\Blackjack-Simulator\\";
        String csv_data_path = sim_path + "data_out_stat\\";

        String csv_file = csv_data_path + "player0_0.csv";

        CsvReadOptions.Builder builder =
                CsvReadOptions.builder(csv_file)
                        .separator(',')         // table is comma-delimited
                        .header(true);          // header is first row

        CsvReadOptions options = builder.build();

        Table game_results = Table.read().usingOptions(options);
    	Plot.show(Histogram.create("Player0 profit distribution", game_results, "profit"));
    }
}
