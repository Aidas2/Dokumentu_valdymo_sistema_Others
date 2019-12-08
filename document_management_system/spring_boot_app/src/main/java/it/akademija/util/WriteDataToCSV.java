package it.akademija.util;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.entity.UserDocument;


public class WriteDataToCSV {

    public static void writeUsersToCSV(PrintWriter writer,List<User> users) {
        try (
                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                        .withHeader("Name", "Surname", "Email"));
        ) {
            for (User user : users) {
                List<String> data = Arrays.asList(
                        user.getName(),
                        user.getSurname(),
                        user.getEmail()
                );

                csvPrinter.printRecord(data);
            }
            csvPrinter.flush();
        } catch (Exception e) {
            System.out.println("Writing to CSV error!");
            e.printStackTrace();
        }
    }

    public static void writeUserByEmailToCSV(PrintWriter writer, User user) {
        try (
                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                        .withHeader("Vardas", "Pavarde", "El.pastas", "Grupes"))) {

            csvPrinter.printRecord(user.getName());
            csvPrinter.printRecord(user.getSurname());
            csvPrinter.printRecord(user.getEmail());

            Set<Group> groups = user.getUserGroups();

            for(Group g : groups){
                List<Object> data1 = Arrays.asList(
                        g.getName()
                );
                csvPrinter.printRecord(data1);
            }

            csvPrinter.flush();
        } catch (Exception e) {
            System.out.println("Writing to CSV error!");
            e.printStackTrace();
        }
    }

    public static void writeUserDocumentsToCSV(PrintWriter writer, User user) {
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                        .withHeader("Pavadinimas", "Sukurimo data", "tipas", "uniklaus numeris", "patvirtintas", "atmestas", "pateiktas"))) {

            List<UserDocument> docs = user.getUserDocuments();

            for (UserDocument ud : docs) {
                List<Object> data = Arrays.asList(
                        ud.getDocument().getTitle(),
                        ud.getDocument().getCreatedDate(),
                        ud.getDocument().getType().getTitle(),
                        ud.getDocument().getUniqueNumber(),
                        ud.isConfirmed(),
                        ud.isRejected(),
                        ud.isSubmitted()
                );

                csvPrinter.printRecord(data);
            }

            csvPrinter.flush();
        } catch (Exception e) {
            System.out.println("Writing to CSV error!");
            e.printStackTrace();
        }
    }
}
