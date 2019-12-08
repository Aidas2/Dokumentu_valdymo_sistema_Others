package it.akademija.repository;

import it.akademija.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDocumentRepository extends JpaRepository<UserDocument, UserDocumentId> {

   @Query(value="select * FROM user_document ud join user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
   List<UserDocument> findByUserEmail(@Param("email") String email);

   @Query(value="select * FROM user_document ud join user u ON (ud.user_id = u.id) WHERE u.email=:email AND d.unique_Number =:number", nativeQuery = true)
   UserDocument findByUserEmailAndDocumentNumber(@Param("email") String email, @Param("number") String number ) ;


}

