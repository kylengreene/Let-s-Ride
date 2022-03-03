package dev10.room13.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
/**
 * model for the Rider entity
 *
 * @apiNote designed to be used in conjunction with JPA/Spring Data REST
 *
 */
@Entity
@Data
@EqualsAndHashCode(exclude = "rsvpRides")
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
    private Set<GrantedAuthority> authorities;

    @JsonIgnore
    @OneToMany(mappedBy = "rider")
    @ToString.Exclude
    private Set<Role> roles;


    @ManyToMany(mappedBy = "attendees")
    private Set<Ride> rsvpRides;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "role",
      joinColumns = @JoinColumn(name = "rider_id"),
      inverseJoinColumns = @JoinColumn(name = "club_id"))
      @ToString.Exclude
    private Set<Club> clubs;

    public Rider(){};

    public Rider(String username, String password, boolean isDisabled, Set<Role> roles){
      this.username = username;
      this.password = password;
      this.isDisabled = isDisabled;
      this.authorities = convertRolesToAuthorities(roles);
    }


    /**
     * @param roles  used by {@code getAuthorities}
     * @return List<GrantedAuthority>  the authorities from corresponding roles i.e., role: "USER", authority: "ROLE_USER"
     */
    public static Set<GrantedAuthority> convertRolesToAuthorities(Set<Role> roles) {
      boolean admin = false;
      Set<GrantedAuthority> authorities = new HashSet<>(roles.size());
      for (Role role : roles) {
          Assert.isTrue((!role.getName().startsWith("ROLE_")),
                          String.format("%s cannot start with %s (it is automatically added)",
                                          role.getName(), "ROLE_"));
        try {
          if (role.getName().equalsIgnoreCase("admin")) {

              if (admin) throw new RuntimeException("User can only be the admin of one club");
              else {
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN_" + role.getClub().getClubId()));
                admin = true;
              }
          }


          if (role.getClub() != null) {
              authorities.add(new SimpleGrantedAuthority(String.format("ROLE_MEMBER_%s", role.getClub().getClubId())));
        } else {
              authorities.add(new SimpleGrantedAuthority(String.format("ROLE_USER")));
        }
    } catch (RuntimeException ex) {
              System.out.println(ex.getMessage());
    }
  }
  return authorities;
}


    /**
     * @param authorities  {@code List<GrantedAuthority>}
     *
     * @return List<Role> authorities formatted into role syntax i.e., removal of the "ROLE_" prefix
     */
    public List<Role> convertAuthoritiesToRoles(Collection<GrantedAuthority> authorities) {
        return authorities.stream()
            .map(a -> {
              String[] auth = a.getAuthority().split("_");
                Role role = new Role();
                role.setName(auth[1]);
                if (auth.length > 2) {
                  role.setClub(new Club());
                  role.getClub().setClubId(Integer.parseInt(auth[2]));
                }
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
    public Set<GrantedAuthority> getAuthorities() {
      Set<GrantedAuthority> set = convertRolesToAuthorities(this.roles);
      return set;
    }
}
