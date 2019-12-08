package it.akademija.wizards.repositories;

import it.akademija.wizards.entities.Role;
import it.akademija.wizards.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByName(RoleName roleName);

    boolean existsByName(RoleName roleName);
}
