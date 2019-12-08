package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.document.DocumentGetReviewCommand;
import it.akademija.wizards.models.stats.StatsGetTypeCommand;
import it.akademija.wizards.models.stats.TypeUserStats;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Date;
import java.util.List;

public interface DocumentRepository extends JpaRepository <Document, String> {

    @Query("SELECT new it.akademija.wizards.models.stats.StatsGetTypeCommand(dt.title, SUM(CASE WHEN d.documentState <> it.akademija.wizards.enums.DocumentState.CREATED then 1 else 0 end)," +
            " SUM(CASE WHEN d.documentState = it.akademija.wizards.enums.DocumentState.ACCEPTED then 1 else 0 end)," +
            " SUM(CASE WHEN d.documentState = it.akademija.wizards.enums.DocumentState.REJECTED then 1 else 0 end))" +
            " FROM Document d JOIN d.documentType dt" +
            " WHERE dt.id IN :docIDs" +
            " AND d.creationDate BETWEEN :dateFrom AND :dateTo" +
            " GROUP BY dt.title")
    List<StatsGetTypeCommand> getDocumentTypesStats(@Param("docIDs") List<String> docIDs, @Param("dateFrom") Date dateFrom, @Param("dateTo") Date dateTo);

    @Query("SELECT new it.akademija.wizards.models.stats.TypeUserStats(u.firstname, u.lastname, COUNT(d.id))" +
            " FROM Document d JOIN d.documentType dt JOIN d.author u" +
            " WHERE dt.id = :documentTypeId AND d.documentState <> it.akademija.wizards.enums.DocumentState.CREATED" +
            " GROUP BY u.firstname, u.lastname ORDER BY COUNT(d.id) DESC")
    List<TypeUserStats> getTopSubmittingUsersForDocType(@Param("documentTypeId") String documentTypeId, Pageable pageable);

    @Query("SELECT new it.akademija.wizards.models.document.DocumentGetReviewCommand(" +
            "d.author.firstname, d.author.lastname, d.id, d.title, d.description, d.documentType.title, d.submissionDate)" +
            " FROM Document d WHERE d.documentType IN :docTypes" +
            " AND d.documentState = it.akademija.wizards.enums.DocumentState.SUBMITTED" +
            " AND :username <> d.author.username" +
            " AND (lower(CONCAT(d.author.firstname, ' ', d.author.lastname)) like %:searchFor% " +
            " OR lower(d.title) like %:searchFor%" +
            " OR lower(d.description) like %:searchFor%" +
            " OR lower(d.id) like %:searchFor%" +
            " OR lower(d.documentType.title) like %:searchFor%)")
    Page<DocumentGetReviewCommand> getDocumentsForReview(@Param(value = "username") String username,
                                                          @Param(value = "searchFor") String searchFor,
                                                          Pageable pageable, @Param(value = "docTypes") List<DocumentType> docTypes);

    @Query("SELECT new it.akademija.wizards.models.document.DocumentGetReviewCommand(" +
            "d.author.firstname, d.author.lastname, d.id, d.title, d.description, d.documentType.title, d.submissionDate)" +
            " FROM Document d WHERE d.documentType IN :docTypes" +
            " AND d.documentState = it.akademija.wizards.enums.DocumentState.SUBMITTED" +
            " AND :username <> d.author.username")
    Page<DocumentGetReviewCommand> getDocumentsForReview(@Param(value = "username") String username,
                                                         Pageable pageable, @Param(value = "docTypes") List<DocumentType> docTypes);

    @Query("SELECT d FROM Document d WHERE d.author = :user AND d.documentState IN :documentStates" +
            " AND (lower(d.title) like %:searchFor%" +
            " OR lower(d.description) like %:searchFor%" +
            " OR lower(d.id) like %:searchFor%" +
            " OR lower(d.documentType.title) like %:searchFor%)")
    Page<Document> findByAuthorAndDocumentStateIn(
            @Param(value = "user") User user,
            @Param(value = "documentStates") List<DocumentState> documentStates,
            @Param(value = "searchFor") String searchFor,
            Pageable pageable);

}


