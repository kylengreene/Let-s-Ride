package dev10.room13.data;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;

import dev10.room13.models.Club;
import dev10.room13.models.Ride;
import dev10.room13.models.Rider;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class RideRepositoryTest {

    @Autowired private DataSource dataSource;
    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private EntityManager entityManager;
    @Autowired private RideRepository rideRepository;

    public static Ride testRide;

    RideRepositoryTest() {
        testRide = new Ride();
        testRide.setRideDatetime(Timestamp.from(Instant.now()));
        testRide.setRouteId(1l);
        testRide.setRideLat(90.00000);
        testRide.setRideLng(-50.11111);
        testRide.setRideDescription("test ride4");
        testRide.setRideLimit(10);
        Club testClub = new Club();
        testClub.setClubId(1);
        testRide.setClub(testClub);
        Rider testRider = new Rider();
        testRider.setRiderId(1);
        testRide.setRideCreator(testRider);
    }

    @BeforeEach
    void setup() {
        jdbcTemplate.update("call set_known_good_state();");
    }

    @Test
    void injectedComponentsAreNotNull() {
        assertNotNull(dataSource);
        assertNotNull(jdbcTemplate);
        assertNotNull(entityManager);
        assertNotNull(rideRepository);
    }

    @Test
    void returnsRideWithIdOne() {
        Ride actual = rideRepository.findById(1).get();
        assertTrue(actual.getRideId() == 1);
        assertTrue(actual.getRideDescription().equalsIgnoreCase("test ride1"));
        assertTrue(actual.getRideCreator().getRiderId() == 1);
    }

    @Test
    void returnsAllRides() {
        List<Ride> all = rideRepository.findAll();
        assertTrue(all.size() == 3);
    }


    @Test
    void savesNewRide() {
        Ride added = rideRepository.save(testRide);
        assertTrue(added.getRideId() == 4);
    }


    @Test
    void updatesExistingRide() {
        testRide.setRideId(1);
        testRide.setRideDescription("Changed");
        testRide.getRideCreator().setRiderId(2);
        Ride updated = rideRepository.save(testRide);
        assertTrue(updated.getRideId() == 1);
        assertTrue(rideRepository.findAll().size() == 3);
        assertTrue(updated.getRideCreator().getRiderId() == 2);
        assertTrue(updated.getRideCreator().getRiderFirstname().equals("Mike"));

    }
}
