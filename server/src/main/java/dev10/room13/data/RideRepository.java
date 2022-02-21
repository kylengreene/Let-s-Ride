package dev10.room13.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import dev10.room13.models.Ride;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "rides", path = "rides")
public interface RideRepository extends JpaRepository<Ride, Integer> {

    @RestResource(path = "postal", rel = "byPostalCode")
    List<Ride> findByRideLocation(String postal);

}
