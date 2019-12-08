package it.akademija.repository;

import it.akademija.entity.DBFile;
import it.akademija.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface  FileRepository extends JpaRepository<File, String> {

    File findByFileName(String fileName);


    @Query(value="SELECT * FROM user_files f JOIN document d ON (f.document_id = d.id) JOIN user_document ud ON (d.id=ud.document_id) JOIN user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    List<DBFile> findAllUserFiles(@Param("email") String email);

    @Query(value="SELECT file_name FROM user_files f JOIN document d ON (f.document_id = d.id) JOIN user_document ud ON (d.id=ud.document_id) JOIN user u ON (ud.user_id = u.id) WHERE u.email=:email", nativeQuery = true)
    List<String> findAllUserFilesNames(@Param("email") String email);

    @Query(value="SELECT file_name FROM user_files f JOIN document d ON (f.document_id = d.id)  WHERE d.uniqueNumber=:uniqueNumber", nativeQuery = true)
    List<String> findDocumentFilesNames(@Param("uniqueNumber") String uniqueNumber);

}
