package dev10.room13.models;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;


import org.springframework.lang.NonNull;

import lombok.Data;
import lombok.ToString;
/**
 * model for the Club entity
 *
 * @apiNote designed to be used in conjuntion with JPA/Spring Data REST
 */

@Entity
@Data
public class Club {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int clubId;

    @NonNull
    private String clubName;
    private String clubDescription;
    private String clubPostalCode;
    private BigDecimal clubMembershipFee;

    @ManyToMany(mappedBy = "clubs")
    private List<Rider> riders;

    @OneToMany(mappedBy = "club")
    private List<Ride> rides;

    public Club() {}

}
