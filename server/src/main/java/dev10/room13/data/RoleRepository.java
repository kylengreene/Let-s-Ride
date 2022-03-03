package dev10.room13.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import dev10.room13.models.Role;


@RepositoryRestResource(path = "roles")
public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query(
        value = "select ri.rider_firstname, ri.rider_lastname, r.name, ri.rider_postal from role r where (r.is_pending = true and r.club_id = :clubId) inner join rider ri on ri.rider_id = r.rider_id",
        nativeQuery = true)
        @RestResource(path = "pending", rel = "pending")
        public List<Role> findAllByIsPending(int clubId);


}
