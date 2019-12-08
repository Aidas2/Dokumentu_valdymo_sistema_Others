package it.docSys.repository;

import it.docSys.entities.DocUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<DocUser, Long> {
    DocUser findByUserName(String username);
//    boolean existsByDocUserName(String docUserName);
    DocUser findByUserNameAndPassword(String userName, String password);
}
