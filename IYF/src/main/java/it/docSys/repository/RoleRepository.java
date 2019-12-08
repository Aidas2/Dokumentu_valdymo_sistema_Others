package it.docSys.repository;

import it.docSys.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long>{
    Optional<String> findByName(String roleName);
    boolean existsByName(String roleName);
}