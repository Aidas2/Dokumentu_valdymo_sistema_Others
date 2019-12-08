package it.docSys.repository;


import it.docSys.entities.RejectedDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface RejectedDocumentRepository extends JpaRepository<RejectedDocument, Long> {
}