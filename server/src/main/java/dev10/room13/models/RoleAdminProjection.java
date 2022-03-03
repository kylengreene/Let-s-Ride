package dev10.room13.models;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "admin", types = {Role.class})
public interface RoleAdminProjection {

    @Value("#{target.getName()}")
    String getApplicationType();

    int getRoleId();

    @Value("#{target.getRider().getRiderFirstname()} #{target.getRider().getRiderLastname()}")
    String getRiderFullName();

    @Value("#{target.getRider().getRiderPostal()}")
    String getRiderPostal();
}
