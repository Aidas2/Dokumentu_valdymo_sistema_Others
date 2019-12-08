package it.akademija.repository;

import it.akademija.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByname(String name);
    Boolean existsByName(String name);
}
