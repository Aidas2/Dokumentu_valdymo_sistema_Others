package it.docSys.repository;

import it.docSys.entities.ApprovedDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ApprovedDocumentRepository extends JpaRepository<ApprovedDocument, Long> {
}