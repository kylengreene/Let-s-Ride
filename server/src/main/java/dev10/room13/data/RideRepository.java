package dev10.room13.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import dev10.room13.models.Ride;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "rides", path = "rides")
public interface RideRepository extends JpaRepository<Ride, Integer> {

    @Query("select r from Ride r where (r.rideLat < :lat + 0.3 and r.rideLat > :lat - 0.3) and (r.rideLng > :lng - 0.3 and r.rideLng < :lng + 0.3)")
    @RestResource(path = "location", rel = "location")
    public List<Ride> findAllByRideLatAndRideLng(double lat, double lng);

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_ADMIN')")
    Ride save(@Param("ride") Ride entity);

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")       // STRETCH: concatenate ROLE_ADMIN with club ID i.e., ROLE_ADMIN_3
    void delete(Ride entity);                         // ?? Maybe add trigger to SQL SCHEMA (when new club is added, add a new role "ROLE_ADMIN_{club_id}")

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    void deleteAll();

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    void deleteById(Integer id);

}
