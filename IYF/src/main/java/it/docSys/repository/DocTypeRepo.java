package it.docSys.repository;

import it.docSys.entities.DocType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocTypeRepo extends JpaRepository<DocType, Long> {
    DocType getByTitle(String title);
    boolean existsByTitle(String title);
    void deleteByTitle(String title);

    }
