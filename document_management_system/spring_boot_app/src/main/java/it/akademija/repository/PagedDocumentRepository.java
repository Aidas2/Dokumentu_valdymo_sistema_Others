package it.akademija.repository;

import it.akademija.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import it.akademija.entity.Document;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;


public interface PagedDocumentRepository extends PagingAndSortingRepository<Document, Long>, JpaSpecificationExecutor<Document> {

    Page<Document> findAll(Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) WHERE ud.submitted = true", nativeQuery = true)
    Page<Document> findAllSubmittedPage(Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.saved = true", nativeQuery = true)
    Page<Document> findAllUserDocumentsPage(@Param("email") String email, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.submitted = true", nativeQuery = true)
    Page<Document> findAllUserSubmittedDocumentsPage(@Param("email") String email, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.submitted = false", nativeQuery = true)
    Page<Document> findAllUserNotSubmittedDocumentsPage(@Param("email") String email, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.confirmed = true", nativeQuery = true)
    Page<Document> findAllUserConfirmedDocumentsPage(@Param("email") String email, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.rejected = true", nativeQuery = true)
    Page<Document> findAllUserRejectedDocumentsPage(@Param("email") String email, Pageable pageable);

    @Query("select count(d) from Document d")
    Long findCount();

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) WHERE ud.submitted = true AND ud.rejected = false AND ud.confirmed = false AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND receive=true group by t.id)", nativeQuery = true)
    Page<Document> findReceivedUserDocumentsPage(@Param("email") String email, Pageable pageable);

    @Query(value = "select * FROM document d where d.submitted_Date BETWEEN :startDate AND :endDate", nativeQuery = true)
    public Page<Document> getAllBetweenDates(@Param("startDate") Date startDate, @Param("endDate") Date endDate, Pageable pageable);

    @Query(value="select * FROM document d join type t ON (d.type_id = t.id) join user_document ud ON (d.id = ud.document_id) WHERE t.title=:title AND ud.submitted = true", nativeQuery = true)
    Page<Document> findAllDocumentsByType(@Param("title") String title, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND d.created_Date BETWEEN :startDate AND :endDate", nativeQuery = true)
    Page<Document> findAllUserDocumentsDateRangePage(@Param("email") String email, @Param("startDate") Date startDate, @Param("endDate") Date endDate, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND d.title like %:title%", nativeQuery = true)
    Page<Document> findAllUserDocumentsByTitle(@Param("email") String email, @Param("title") String title, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) WHERE ud.submitted = true AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND lower(d.title) like %:title% AND receive=true group by t.id)", nativeQuery = true)
    Page<Document> findAllUserReceivedDocumentsByTitle(@Param("email") String email, @Param("title") String title, Pageable pageable);


    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) WHERE ud.submitted = true AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND d.submitted_Date BETWEEN :startDate AND :endDate AND receive=true group by t.id)", nativeQuery = true)
    Page<Document> findAllUserReceivedDocumentsDateRange(@Param("email") String email, @Param("startDate") Date startDate, @Param("endDate") Date endDate, Pageable pageable);
}
