package dev10.room13.data;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

import dev10.room13.models.Rider;

import javax.persistence.Transient;

@RepositoryRestResource(collectionResourceRel = "riders", path = "riders")
@CrossOrigin
public interface RiderRepository extends JpaRepository<Rider, Integer> {

    @RestResource(path="user", rel="user")
    Optional<Rider> findByUsername(String username);

    @Override
    @PreAuthorize("hasAuthority('ROLE_USER')")
    Optional<Rider> findById(Integer id);

}
