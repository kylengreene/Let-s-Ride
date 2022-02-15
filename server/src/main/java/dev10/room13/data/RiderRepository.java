package dev10.room13.data;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import dev10.room13.models.Rider;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface RiderRepository extends PagingAndSortingRepository<Rider, Integer> {

    List<Rider> findByLastName(@Param("name") String name);

}
