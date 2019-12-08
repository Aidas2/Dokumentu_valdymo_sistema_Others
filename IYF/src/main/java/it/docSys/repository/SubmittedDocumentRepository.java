package it.docSys.repository;

import it.docSys.entities.SubmittedDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface SubmittedDocumentRepository extends JpaRepository<SubmittedDocument, Long> {
}