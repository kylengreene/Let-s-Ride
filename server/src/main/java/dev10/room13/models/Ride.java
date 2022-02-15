package dev10.room13.models;

import java.sql.Timestamp;

public class Ride {
    private int rideId;
    private long routeId;
    private Timestamp rideDateTime;
    private String rideLocation;
    private String rideDescription;
    private int rideLimit;
    private Member rideCreator;

    public Ride(){}

    public int getRideId() {
        return rideId;
    }
    public void setRideId(int rideId) {
        this.rideId = rideId;
    }
    public long getRouteId() {
        return routeId;
    }
    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }
    public Timestamp getRideDateTime() {
        return rideDateTime;
    }
    public void setRideDateTime(Timestamp rideDateTime) {
        this.rideDateTime = rideDateTime;
    }
    public String getRideLocation() {
        return rideLocation;
    }
    public void setRideLocation(String rideLocation) {
        this.rideLocation = rideLocation;
    }
    public String getRideDescription() {
        return rideDescription;
    }
    public void setRideDescription(String rideDescription) {
        this.rideDescription = rideDescription;
    }
    public int getRideLimit() {
        return rideLimit;
    }
    public void setRideLimit(int rideLimit) {
        this.rideLimit = rideLimit;
    }
    public Member getRideCreator() {
        return rideCreator;
    }
    public void setRideCreator(Member rideCreator) {
        this.rideCreator = rideCreator;
    }

}
