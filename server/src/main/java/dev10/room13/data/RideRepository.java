package dev10.room13.data;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.format.annotation.DateTimeFormat;
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

    @RestResource(path = "datetime", rel = "datetime")
    public List<Ride> findAllByRideDatetimeBetween(@DateTimeFormat(iso=DateTimeFormat.ISO.DATE_TIME) Date now, @DateTimeFormat(iso=DateTimeFormat.ISO.DATE_TIME) Date weekFromNow);

    @Modifying
    @Query("update Ride r set r.pending = :pending where r.rideId = :rideId")
    int updateRideSetIsPendingForId(@Param("pending") boolean pending, @Param("rideId") int rideId);

    @Query(
    value = "select * from ride r where r.pending = true and r.club_id = :clubId",
    nativeQuery = true)
    @RestResource(path = "pending", rel = "pending")
    public List<Ride> findAllByIsPending(int clubId);

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    void delete(Ride entity);

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    void deleteAll();

    @Override
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    void deleteById(Integer id);

}
