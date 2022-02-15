package dev10.room13.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Rider {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int riderId;
    private String riderFirstname;
    private String riderLastname;
    private String riderPostal;
    private String riderUsername;
    private String riderPassword;


    public int getRiderId() {
        return riderId;
    }
    public void setRiderId(int riderId) {
        this.riderId = riderId;
    }
    public String getRiderFirstname() {
        return riderFirstname;
    }
    public void setRiderFirstname(String riderFirstname) {
        this.riderFirstname = riderFirstname;
    }
    public String getRiderLastname() {
        return riderLastname;
    }
    public void setRiderLastname(String riderLastname) {
        this.riderLastname = riderLastname;
    }
    public String getRiderPostal() {
        return riderPostal;
    }
    public void setRiderPostal(String riderPostal) {
        this.riderPostal = riderPostal;
    }
    public String getRiderUsername() {
        return riderUsername;
    }
    public void setRiderUsername(String riderUsername) {
        this.riderUsername = riderUsername;
    }
    public String getRiderPassword() {
        return riderPassword;
    }
    public void setRiderPassword(String riderPassword) {
        this.riderPassword = riderPassword;
    }
}
