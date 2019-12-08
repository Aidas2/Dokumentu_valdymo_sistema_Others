package it.docSys.repository;

import it.docSys.entities.CreatedDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CreatedDocumentRepository extends JpaRepository<CreatedDocument, Long> {
}
