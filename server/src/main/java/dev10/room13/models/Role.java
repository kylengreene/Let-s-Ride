package dev10.room13.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import lombok.Data;

@Entity
@Data
public class Role {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int roleId;
private String name;

@ManyToMany(mappedBy = "roles")
private List<Rider> riders;

public Role(){};

public Role(String name){
    this.name = name;
    }
}
