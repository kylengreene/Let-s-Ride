package dev10.room13.models;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


@Projection(name = "details", types = {Ride.class})
public interface RideDetailProjection {

    @Value("#{target.getClub().getClubName()}")
    String getClubName();

    @Value("#{target.getClub().getClubId()}")
    int getClubId();

    String getRideDescription();

    double getRideLat();

    double getRideLng();

    Date getRideDatetime();

    int getRideLimit();


}
