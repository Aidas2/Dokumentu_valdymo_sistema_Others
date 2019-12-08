package it.akademija.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.akademija.entity.DBFile;

@Repository
public interface DBFileRepository extends JpaRepository<DBFile, String> {

    DBFile findByFileName(String fileName);


    @Query(value="SELECT * FROM files f JOIN document d ON (f.document_id = d.id) JOIN user_document ud ON (d.id=ud.document_id) JOIN user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    List<DBFile> findAllUserFiles(@Param("email") String email);

    @Query(value="SELECT file_name FROM files f JOIN document d ON (f.document_id = d.id) JOIN user_document ud ON (d.id=ud.document_id) JOIN user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    List<String> findAllUserFilesNames(@Param("email") String email);

    @Query(value="SELECT data FROM files f JOIN document d ON (f.document_id = d.id) JOIN user_document ud ON (d.id=ud.document_id) JOIN user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    byte [] findAllUserFilesData(@Param("email") String email);

//    @Query(value="SELECT * FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
//    List<Type> getUserGroupTypes(@Param("email") String email);
}
//        SELECT FILES.FILE_NAME, USER.EMAIL FROM FILES
//        LEFT JOIN DOCUMENT ON FILES.DOCUMENT_ID = DOCUMENT.ID
//        LEFT JOIN USER_DOCUMENT ON DOCUMENT.ID =USER_DOCUMENT.DOCUMENT_ID
//        LEFT JOIN USER ON USER_DOCUMENT.USER_ID =USER.ID
//        WHERE USER.EMAIL = 'virga@email.com';