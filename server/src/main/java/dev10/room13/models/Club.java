package dev10.room13.models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Club {

    private int clubId;
    private String clubName;
    private String clubDescription;
    private String clubPostalCode;
    private BigDecimal clubMembershipFee;
    private List<Ride> clubRides = new ArrayList<>();
    private List<Member> clubMembers = new ArrayList<>();
    private List<Admin> clubAdmins = new ArrayList<>();


    public Club() {}


    public int getClubId() {
        return clubId;
    }
    public void setClubId(int clubId) {
        this.clubId = clubId;
    }
    public String getClubName() {
        return clubName;
    }
    public void setClubName(String clubName) {
        this.clubName = clubName;
    }
    public String getClubDescription() {
        return clubDescription;
    }
    public void setClubDescription(String clubDescription) {
        this.clubDescription = clubDescription;
    }
    public String getClubPostalCode() {
        return clubPostalCode;
    }
    public void setClubPostalCode(String clubPostalCode) {
        this.clubPostalCode = clubPostalCode;
    }
    public BigDecimal getClubMembershipFee() {
        return clubMembershipFee;
    }
    public void setClubMembershipFee(BigDecimal clubMembershipFee) {
        this.clubMembershipFee = clubMembershipFee;
    }
    public List<Ride> getClubRides() {
        return clubRides;
    }
    public void setClubRides(List<Ride> clubRides) {
        this.clubRides = clubRides;
    }
    public List<Member> getClubMembers() {
        return clubMembers;
    }
    public void setClubMembers(List<Member> clubMembers) {
        this.clubMembers = clubMembers;
    }
    public List<Admin> getClubAdmins() {
        return clubAdmins;
    }
    public void setClubAdmins(List<Admin> clubAdmins) {
        this.clubAdmins = clubAdmins;
    }
}
