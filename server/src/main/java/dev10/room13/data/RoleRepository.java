package dev10.room13.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import dev10.room13.models.Role;


@RepositoryRestResource(exported = false)
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
