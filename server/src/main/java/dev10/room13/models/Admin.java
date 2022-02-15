package dev10.room13.models;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Admin {

    @Id
    private int memberId;

    public Admin(){}
}
