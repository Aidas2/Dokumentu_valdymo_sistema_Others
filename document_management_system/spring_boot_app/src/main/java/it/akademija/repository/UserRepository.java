package it.akademija.repository;

import it.akademija.dto.TopGroupUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import it.akademija.entity.User;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    User findByEmail(String email);

    User findBySurname(String surname);

    void deleteBySurname(String surname);

    void deleteByEmail(String email);

    Boolean existsByEmail(String email);

    int getUserDocumentDetails(@Param("email") String email);

    @Query(value="select email, Count (u.id) as counted  FROM user u join user_document ud ON (u.id = ud.user_id) join document d ON (ud.document_id = d.id) WHERE ud.submitted = true AND d.type_id IN (SELECT t.id FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) JOIN ADMIN_GROUP g ON (tg.GROUP_ID =g.id) WHERE u.email=:email AND g.name=:name AND receive=true group by t.id)group by email ORDER BY 1 ASC LIMIT 10", nativeQuery=true)
    List<Object[]> getUsersByGroupSubmittedDocuments(@Param("email")String email, @Param("name")String name);

}
