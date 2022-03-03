package dev10.room13.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
/**
 * model for the Role entity
 *
 * @apiNote designed to be used in conjunction with JPA/Spring Data REST
 */
@Entity
@Data
@EqualsAndHashCode(exclude = "rider")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private int roleId;

    private String name;

    @ManyToOne
    @JoinColumn(name="club_id")
    private Club club;

    @ManyToOne
    @JoinColumn(name="rider_id")
    private Rider rider;

    private boolean pending;

    public Role(){}

    public Role(String name){
        this.name = name;
    }

}
