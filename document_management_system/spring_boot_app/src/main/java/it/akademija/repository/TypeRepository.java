package it.akademija.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.akademija.entity.Type;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {
    Type findByTitle(String title);

    @Query(value="SELECT * FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND send=true", nativeQuery = true)
    List<Type> getUserGroupTypes(@Param("email") String email);

    @Query(value="SELECT * FROM type t JOIN type_group tg ON (t.id = tg.type_id) JOIN users_groups ug ON (tg.group_id=ug.group_id) JOIN user u ON (ug.user_id = u.id) WHERE u.email=:email AND receive=true", nativeQuery = true)
    List<Type> getUserReceivingGroupTypes(@Param("email") String email);

    Boolean existsByTitle(String title);
}
