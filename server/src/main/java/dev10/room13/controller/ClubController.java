package dev10.room13.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;

import dev10.room13.data.ClubRepository;
import dev10.room13.models.Club;



@RepositoryRestController
public class ClubController {

    @Autowired
    private ClubRepository repo;

    @PutMapping("/clubs/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ResponseEntity<?> update(@Param("club") Club club) {
        if (repo.save(club) != null) {
            return new ResponseEntity<Club>(club, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
