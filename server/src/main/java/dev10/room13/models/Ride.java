package dev10.room13.models;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.FutureOrPresent;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
/**
 * model for the Ride entity
 *
 * @apiNote designed to be used in conjunction with JPA/Spring Data REST
 */
@Entity
@Data
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rideId;
    private Long routeId;

    @FutureOrPresent
    @Temporal(TemporalType.TIMESTAMP)
    private Date rideDatetime;

    private double rideLat;
    private double rideLng;
    private String rideDescription;
    private Integer rideLimit;

    @ManyToOne(optional = false)
    @JoinColumn(name = "rider_id")
    private Rider rideCreator;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "ride_rider",
      joinColumns = @JoinColumn(name = "ride_id"),
      inverseJoinColumns = @JoinColumn(name = "rider_id"))
    private Set<Rider> attendees;

    @ManyToOne
    @JoinColumn(name="club_id")
    private Club club;

    public Ride(){}
}
