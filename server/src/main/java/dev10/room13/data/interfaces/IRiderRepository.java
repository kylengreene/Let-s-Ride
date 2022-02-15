package dev10.room13.data.interfaces;

import java.util.List;

import dev10.room13.models.Rider;

import org.springframework.data.repository.CrudRepository;

public interface IRiderRepository extends CrudRepository<Rider, Integer> {

}
