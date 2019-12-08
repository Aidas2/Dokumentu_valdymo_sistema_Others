package it.akademija.repository;

import it.akademija.dto.UserDTO;
import it.akademija.entity.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long>, JpaSpecificationExecutor<Document> {



    Document findByTitle(String title);
    Document findByuniqueNumber(String uniqueNumber);

    List<Document> findByCreatedDate(Date createdDate, Pageable pageable);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    List<Document> findAllUserDocumentsl(@Param("email") String email);

    @Query(value="select COUNT (*) FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    int getUserDocumentCount(@Param("email") String email);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.submitted = true", nativeQuery = true)
    List<Document> findAllUserSubmittedDocumentsl(@Param("email") String email);

    @Query(value="select count (*) FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.submitted = true", nativeQuery = true)
    int getUserSubmittedDocumentCount(@Param("email") String email);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.confirmed = true", nativeQuery = true)
    List<Document> findAllUserConfirmedDocumentsl(@Param("email") String email);

    @Query(value="select count(*) FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.confirmed = true", nativeQuery = true)
    int getUserConfirmedDocumentCount(@Param("email") String email);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.rejected = true", nativeQuery = true)
    List<Document> findAllUserRejectedDocumentsl(@Param("email") String email);

    @Query(value="select count (*) FROM document d join user_document ud ON (d.id = ud.document_id) join user u ON (ud.user_id = u.id) WHERE u.email=:email AND  ud.rejected = true", nativeQuery = true)
    int getUserRejectedDocumentCount(@Param("email") String email);

    @Query(value="select * FROM document d join user_document ud ON (d.id = ud.document_id) WHERE ud.submitted = true AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND receive=true group by t.id)", nativeQuery = true)
    List<Document> findReceivedUserDocuments(@Param("email") String email);

    @Query(value="select count(*) FROM document d join user_document ud ON (d.id = ud.document_id) joint type t ON (d.type_id = t.id) WHERE t.title =:title AND ud.submitted =true", nativeQuery = true)
    int findCountByDocumentTitleAndStatus(@Param("title") String title);

    @Query(value="select COUNT (*) FROM document d join user_document ud ON (d.id = ud.document_id) join type t ON (d.type_id=t.id) WHERE d.submitted_Date BETWEEN :startDate AND :endDate AND t.title =:title AND ud.submitted = true AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) JOIN ADMIN_GROUP g ON (tg.GROUP_ID =g.id) WHERE u.email=:email AND g.name=:name AND submitted=true group by t.id)", nativeQuery = true)
    int findSubmittedUserDocumentCountByGroupTypeDateRange(@Param("email") String email, @Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("title") String title, @Param("name") String name);

    @Query(value="select COUNT (*) FROM document d join user_document ud ON (d.id = ud.document_id) join type t ON (d.type_id=t.id) WHERE d.submitted_Date BETWEEN :startDate AND :endDate AND t.title =:title AND ud.confirmed = true AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) JOIN ADMIN_GROUP g ON (tg.GROUP_ID =g.id) WHERE u.email=:email AND g.name=:name AND confirmed=true group by t.id)", nativeQuery = true)
    int findConfirmedUserDocumentCountByGroupTypeDateRange(@Param("email") String email, @Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("title") String title, @Param("name") String name);

    @Query(value="select COUNT (*) FROM document d join user_document ud ON (d.id = ud.document_id) join type t ON (d.type_id=t.id) WHERE d.submitted_Date BETWEEN :startDate AND :endDate AND t.title =:title AND ud.rejected = true AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) JOIN ADMIN_GROUP g ON (tg.GROUP_ID =g.id) WHERE u.email=:email AND g.name=:name AND receive=true group by t.id)", nativeQuery = true)
    int findRejectedUserDocumentCountByGroupTypeDateRange(@Param("email") String email, @Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("title") String title, @Param("name") String name);
}

