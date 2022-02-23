package dev10.room13.models;

import java.util.List;


import org.springframework.data.rest.core.config.Projection;

@Projection(name = "account", types = {Rider.class})
public interface RiderAccountProjection {

    String getRiderFirstname();

    String getRiderLastname();

    List<Club> getClubs();
}
