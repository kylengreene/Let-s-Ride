package dev10.room13.data.interfaces;

import java.util.List;

import dev10.room13.models.Rider;

public interface IRiderRepository {

    List<Rider> findAllRiders();

    Rider findRiderById(int id);

    Rider add(Rider rider);

    boolean update(Rider rider);

    boolean deleteById(int id);
}
