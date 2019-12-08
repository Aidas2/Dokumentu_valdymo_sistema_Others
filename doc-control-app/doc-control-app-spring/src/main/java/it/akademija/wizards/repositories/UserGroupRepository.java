package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroupRepository extends JpaRepository <UserGroup, String> {
    boolean existsByTitle(String title);
}
