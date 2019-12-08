package it.docSys.repository;

import it.docSys.entities.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepo extends JpaRepository<GroupEntity, Long> {
    GroupEntity getByTitle(String title);
    void deleteByTitle(String title);
}
