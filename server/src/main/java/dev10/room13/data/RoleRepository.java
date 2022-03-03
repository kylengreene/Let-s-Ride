package dev10.room13.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import dev10.room13.models.Role;


@RepositoryRestResource(path = "roles")
@CrossOrigin
public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query("select r, ri, c from Role r join r.rider ri join r.club c where c.clubId = :clubId and r.pending = true")
        @RestResource(path = "pending", rel = "pending")
        public List<Role> findAllByIsPending(int clubId);


}
