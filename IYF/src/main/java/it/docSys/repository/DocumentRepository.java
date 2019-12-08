package it.docSys.repository;

import it.docSys.entities.DocUser;
import it.docSys.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


    @Transactional
    public interface DocumentRepository extends JpaRepository<Document, Long> {
        Document findAllByState(String state);

    }


