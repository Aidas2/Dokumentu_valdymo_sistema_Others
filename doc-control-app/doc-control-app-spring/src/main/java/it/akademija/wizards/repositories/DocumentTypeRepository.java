package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentTypeRepository extends JpaRepository<DocumentType, String> {
    DocumentType findByTitle(String title);

    @Query("SELECT DISTINCT dt FROM User u JOIN u.userGroups ug JOIN ug.reviewDocumentType dt WHERE u = :user")
    List<DocumentType> findAllByGroupsAndUser(@Param(value = "user") User user);

    boolean existsByTitle(String title);
}
