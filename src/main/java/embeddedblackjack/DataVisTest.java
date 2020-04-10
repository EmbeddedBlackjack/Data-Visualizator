package embeddedblackjack;

import tech.tablesaw.api.DoubleColumn;

/**
 * Hello world!
 */
public class DataVisTest {

    /**
     * Says hello to the world and more tests...
     * @param args The arguments of the program.
     */
    public static void main(String[] args) {
        System.out.println("Hello World! :)");

        // tech.tablesaw tests
        //https://jtablesaw.github.io/tablesaw/gettingstarted
        double[] numbers = {1, 2, 3, 4};
        DoubleColumn nc = DoubleColumn.create("nc", numbers);
        System.out.println(nc.print());

        double three = nc.get(2);
        System.out.println("three =" + three);

        DoubleColumn nc2 = nc.multiply(4);
        System.out.println(nc2.print());

        DoubleColumn filtered = nc.where(nc.isLessThan(3));
        System.out.println(filtered.print());

        //System.out.println(bushTable.structure());
    }
}
