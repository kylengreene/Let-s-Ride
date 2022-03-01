package dev10.room13.data;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import dev10.room13.models.Club;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ClubRepositoryTest {

    @Autowired private DataSource dataSource;
    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private EntityManager entityManager;
    @Autowired private ClubRepository clubRepository;

    public static Club testClub;

    ClubRepositoryTest() {
        testClub = new Club();
        testClub.setClubName("CLUB5");
        testClub.setClubDescription("test club5");
        testClub.setClubPostalCode("99999");
        testClub.setClubMembershipFee(new BigDecimal(12));
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
        assertNotNull(clubRepository);
    }

    @Test
    void returnsClubWithIdOne() {
        Club actual = clubRepository.findById(1).get();
        assertTrue(actual.getClubId() == 1);
        assertTrue(actual.getClubName().equalsIgnoreCase("CLUB1"));
        assertTrue(actual.getRiders().size() == 3);
    }

    @Test
    void returnsAllClubs() {
        List<Club> all = clubRepository.findAll();
        assertTrue(all.size() == 4);
    }

    @Test
    void savesNewClub() {
        Club added = clubRepository.save(testClub);
        assertTrue(added.getClubId() == 5);
    }

    @Test
    void updatesExistingClub() {
        testClub.setClubId(1);
        testClub.setClubName("Changed");
        Club updated = clubRepository.save(testClub);
        assertTrue(updated.getClubId() == 1);
        assertTrue(clubRepository.findAll().size() == 4);
    }

    @Test
    void findsAllByPostalCode() {
        List<Club> list = clubRepository.findAllByClubPostalCode("22222");
        assertTrue(list.size() == 2);
        for (int i = 0; i < list.size(); i++) {
            assertTrue(list.get(i).getClubName().equals(String.format("CLUB%s", 3+i)));
        }
    }

    @Test
    void findsOneByName() {
        Club club2 = clubRepository.findByClubName("CLUB2");
        assertTrue(club2.getClubName().equals("CLUB2"));
    }
}
