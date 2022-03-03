package dev10.room13.models;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "homepage", types = {Ride.class})
public interface RideHomepageProjection {

    String getRideDescription();

    Integer getRideLimit();

    @Value("#{target.getAttendees().size()}")
    Integer getAttendees();

    @Value("#{target.getClub().getClubName()}")
    String getClubName();
}
