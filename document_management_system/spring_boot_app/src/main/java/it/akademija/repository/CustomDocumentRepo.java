package it.akademija.repository;

import it.akademija.entity.Document;

import java.util.Date;
import java.util.List;

public interface CustomDocumentRepo {
    List<Document> findPageResultByDate (Date createdDate, int offset, int limit);
}
