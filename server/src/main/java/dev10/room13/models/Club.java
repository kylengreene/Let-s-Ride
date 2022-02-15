package dev10.room13.models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;


@Entity
@Data
public class Club {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int clubId;
    private String clubName;
    private String clubDescription;
    private String clubPostalCode;
    private BigDecimal clubMembershipFee;
    private List<Ride> clubRides = new ArrayList<>();
    private List<Member> clubMembers = new ArrayList<>();
    private List<Admin> clubAdmins = new ArrayList<>();


    public Club() {}

}
