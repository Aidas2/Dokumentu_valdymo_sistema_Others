package it.akademija.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import it.akademija.entity.User;

public interface PagedUserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User> {
    Page<User> findAll(Pageable pageable);
}
