package dev10.room13.models;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int rideId;
    private Long routeId;
    private Timestamp rideDatetime;
    private String rideLocation;
    private String rideDescription;
    private int rideLimit;

    @ManyToOne(optional = false)
    @JoinColumn(name = "rider_id")
    private Rider rideCreator;

    @ManyToOne
    @JoinColumn(name="club_id")
    private Club club;

    public Ride(){}
}
