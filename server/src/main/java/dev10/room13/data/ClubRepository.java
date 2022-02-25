package dev10.room13.data;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import dev10.room13.models.Club;

@RepositoryRestResource(collectionResourceRel = "clubs", path = "clubs")
public interface ClubRepository extends JpaRepository<Club, Integer> {

    @RestResource(path = "name", rel="name")
    Club findByClubName(String clubName);

    @RestResource(path="postal", rel="postal")
    List<Club> findAllByClubPostalCode(String clubPostalCode);

    @Override
    Club save(Club entity);

}
