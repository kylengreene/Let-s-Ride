package dev10.room13.data;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import dev10.room13.models.Rider;

import javax.persistence.Transient;

@RepositoryRestResource(collectionResourceRel = "riders", path = "riders")
public interface RiderRepository extends JpaRepository<Rider, Integer> {

    @RestResource(path="user", rel="user")
    @Transient
    Optional<Rider> findByUsername(String username);

}
