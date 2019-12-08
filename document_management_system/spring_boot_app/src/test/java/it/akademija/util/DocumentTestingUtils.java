package it.akademija.util;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import org.apache.commons.lang3.RandomStringUtils;

import it.akademija.dto.DocumentDTO;
import it.akademija.entity.Document;
import it.akademija.entity.User;
import it.akademija.entity.UserDocument;
import it.akademija.payload.RequestDocument;

public class DocumentTestingUtils {

    private final static int minDay = (int) LocalDate.of(1990, 1, 1).toEpochDay();
    private final static int maxDay = (int) LocalDate.of(2019, 1, 1).toEpochDay();

    private static int uniqueNumber = 1;

    private final static Random random = new Random();

    private DocumentTestingUtils() {}

    public static Document randomDocument() {
        Document document = new Document();
        document.setTitle(RandomStringUtils.randomAlphabetic(5, 8));
        document.setDescription(RandomStringUtils.randomAlphabetic(15, 80));
        document.setId(random.nextLong());

        document.setUniqueNumber(String.valueOf(uniqueNumber));
        uniqueNumber += 1;

        LocalDate created = randomDate();
        LocalDate submitted = randomDateAfter(created);

        document.setCreatedDate(Date.valueOf(created));
        document.setSubmittedDate(Date.valueOf(submitted));

        return document;
    }

    public static RequestDocument randomRequestDocument() {
        RequestDocument document = new RequestDocument();
        document.setTitle(RandomStringUtils.randomAlphabetic(5, 8));
        document.setDescription(RandomStringUtils.randomAlphabetic(15, 80));

        document.setUniqueNumber(String.valueOf(uniqueNumber));
        uniqueNumber += 1;

        return document;
    }

    private static LocalDate randomDate() {
        return LocalDate.ofEpochDay(minDay + random.nextInt(maxDay - minDay));
    }

    private static LocalDate randomDateAfter(LocalDate date) {
        int effectiveMinDay = (int) date.toEpochDay();
        return LocalDate.ofEpochDay(effectiveMinDay + random.nextInt(maxDay - effectiveMinDay));
    }

    public static UserDocument userDocumentFrom(User user, Document document) {
        UserDocument userDocument = new UserDocument();
        userDocument.setUser(user);
        userDocument.setDocument(document);
        userDocument.setSubmitted(random.nextBoolean());
        userDocument.setConfirmed(random.nextBoolean());
        userDocument.setMessage(RandomStringUtils.randomAlphabetic(20, 80));
        userDocument.setRejected(random.nextBoolean());
        userDocument.setSaved(random.nextBoolean());
        return userDocument;
    }

    public static List<UserDocument> userDocumentFrom(User user, List<Document> documents) {
        if (documents.isEmpty()) {
            return Collections.emptyList();
        }

        List<UserDocument> userDocuments = new ArrayList<>();
        for (int i = 0; i < documents.size(); i++) {
            userDocuments.add(userDocumentFrom(user,
                    documents.get(i)));
        }
        return userDocuments;
    }

    public static boolean matches(Document document, DocumentDTO dto) {
        return document.getUniqueNumber().equals(dto.getNumber()) &&
                document.getTitle().equals(dto.getTitle()) &&
                document.getCreatedDate().equals(dto.getCreatedDate()) &&
                document.getSubmittedDate().equals(dto.getSubmittedDate()) &&
                document.getDescription().equals(dto.getDescription());
    }

    public static boolean matches(Document document, RequestDocument dto) {
        return document.getUniqueNumber().equals(dto.getUniqueNumber()) &&
                document.getTitle().equals(dto.getTitle()) &&
                document.getDescription().equals(dto.getDescription());
    }

}
