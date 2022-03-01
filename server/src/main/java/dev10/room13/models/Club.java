package dev10.room13.models;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.lang.NonNull;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
/**
 * model for the Club entity
 *
 * @apiNote designed to be used in conjuntion with JPA/Spring Data REST
 */

@Entity
@Data
@EqualsAndHashCode(exclude = "riders")
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
    private Set<Rider> riders;

    @OneToMany(mappedBy = "club")
    private List<Ride> rides;

    @JsonIgnore
    @OneToMany(mappedBy = "club")
    private List<Role> roles;

    public Club() {}

}
