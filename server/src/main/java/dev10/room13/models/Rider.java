package dev10.room13.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Rider {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int riderId;
    private String riderFirstname;
    private String riderLastname;
    private String riderPostal;
    private String riderUsername;
    private String riderPassword;

    public Rider(){}
}
