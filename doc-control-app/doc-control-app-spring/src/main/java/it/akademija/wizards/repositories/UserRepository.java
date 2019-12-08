package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
    void deleteByUsername(String username);
    List<User> findAllByUsernameIn(List<String> users);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    @Query("SELECT DISTINCT dt FROM DocumentType dt JOIN dt.reviewUserGroups rug JOIN rug.users u WHERE u.username = ?1")
    List<DocumentType> findDocTypesUserCanReview(String username);

    @Query("SELECT u FROM User u WHERE lower(u.username) LIKE %:searchFor% " +
            " OR lower(concat(u.firstname, ' ', u.lastname)) LIKE %:searchFor% " +
            " OR lower(u.email) LIKE %:searchFor%")
    Page<User> findAllAndSearch(@Param(value = "searchFor") String searchFor, Pageable pageable);
}
