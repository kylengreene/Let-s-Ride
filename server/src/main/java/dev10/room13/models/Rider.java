package dev10.room13.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

import lombok.Data;
import lombok.ToString;
/**
 * model for the Rider entity
 *
 * @apiNote designed to be used in conjunction with JPA/Spring Data REST
 *@author Joshua Kesler
 */
@Entity
@Data
public class Rider implements UserDetails {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int riderId;

    private String riderFirstname;
    private String riderLastname;
    private String riderPostal;
    @JsonIgnore private String username;
    @JsonIgnore @ToString.Exclude private String password;
    @JsonIgnore private boolean isDisabled;

    @Transient
    private List<GrantedAuthority> authorities;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "rider_role",
      joinColumns = @JoinColumn(name = "rider_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
      @ToString.Exclude
    private List<Role> roles;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "rider_club",
      joinColumns = @JoinColumn(name = "rider_id"),
      inverseJoinColumns = @JoinColumn(name = "club_id"))
      @ToString.Exclude
    private List<Club> clubs;

    public Rider(){};

    public Rider(String username, String password, boolean isDisabled, List<Role> roles){
      this.username = username;
      this.password = password;
      this.isDisabled = isDisabled;
      this.authorities = convertRolesToAuthorities(roles);
    }


    /**
     * @param roles  used by {@code getAuthorities}
     * @return List<GrantedAuthority>  the authorities from corresponding roles i.e., role: "USER", authority: "ROLE_USER"
     */
    public static List<GrantedAuthority> convertRolesToAuthorities(List<Role> roles) {
      List<GrantedAuthority> authorities = new ArrayList<>(roles.size());
      for (Role role : roles) {
          Assert.isTrue((!role.getName().startsWith("ROLE_")),
                          String.format("%s cannot start with %s (it is automatically added)",
                                          role.getName(), "ROLE_"));
          authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
      }
      return authorities;
  }


    /**
     * @param authorities  {@code List<GrantedAuthority>}
     *
     * @return List<Role> authorities formatted into role syntax i.e., removal of the "ROLE_" prefix
     */
    public static List<Role> convertAuthoritiesToRoles(Collection<GrantedAuthority> authorities) {
        return authorities.stream()
            .map(a -> {
                Role role = new Role();
                role.setName(a.getAuthority().substring(5));
                return role;
            })
            .collect(Collectors.toList());
    }







    /**
     *
     * {@return boolean} for the scope of v1 of this project, alwaus {@code true}
     */
    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
      return true;
    }


    /**
     * {@return boolean}  for the scope of v1 of this project, always {@code true}
     */
    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
      return true;
    }


    /**
     * {@return boolean}  for the scope of v1 of this project, always {@code true}
     */
    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
      return true;
    }


    /**
     * {@return boolean}  for the scope of v1 of this project, always {@code true}
     */
    @JsonIgnore
    @Override
    public boolean isEnabled() {
      return !isDisabled;
    }


    /**
     * not a getter in the traditional sense. called by
     *
     * {@return List<GrantedAuthority> list}
     */
    @JsonIgnore
    @Override
    public List<GrantedAuthority> getAuthorities() {
      List<GrantedAuthority> list = convertRolesToAuthorities(this.roles);
      return list;
    }
}
