package it.akademija.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.akademija.entity.TypeGroup;
import it.akademija.entity.TypeGroupId;

public interface TypeGroupRepository extends JpaRepository<TypeGroup, TypeGroupId> {
}
