package dev10.room13.data;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;

import dev10.room13.models.Rider;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class RiderRepositoryTest {

    @Autowired private DataSource dataSource;
    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private EntityManager entityManager;
    @Autowired private RiderRepository riderRepository;

    public static Rider testRider;

    RiderRepositoryTest() {
        testRider = new Rider();
        testRider.setRiderFirstname("TEST");
        testRider.setRiderLastname("TEST");
        testRider.setRiderPostal("22222");
        testRider.setUsername("USERNAME");
        testRider.setDisabled(false);
        testRider.setPassword("Password"); //this will be stored as a hash in production database
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
        assertNotNull(riderRepository);
    }

    @Test
    void returnsRiderWithIdOne() {
        Rider actual = riderRepository.findById(1).get();
        assertTrue(actual.getRiderId() == 1);
        assertTrue(actual.getRiderFirstname().equalsIgnoreCase("Bjarne"));
        assertTrue(actual.getClubs().size() == 2);
    }

    @Test
    void returnsAllRiders() {
        List<Rider> all = riderRepository.findAll();
        assertTrue(all.size() == 5);
    }

    @Test
    void savesNewRider() {
        Rider added = riderRepository.save(testRider);
        assertTrue(added.getRiderId() == 6);
    }

    @Test
    void updatesExistingRider() {
        testRider.setRiderId(1);
        testRider.setRiderFirstname("Changed");
        Rider updated = riderRepository.save(testRider);
        assertTrue(updated.getRiderId() == 1);
        assertTrue(riderRepository.findAll().size() == 5);
    }

    @Test
    void findsOneByName() {
        Rider rider4 = riderRepository.findByUsername("user4").get();
        assertTrue(rider4.getRiderFirstname().equals("Taylor"));
    }
}
