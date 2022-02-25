// package dev10.room13.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.repository.query.Param;
// import org.springframework.data.rest.webmvc.RepositoryRestController;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.core.context.SecurityContext;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.bind.annotation.PatchMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;

// import dev10.room13.data.ClubRepository;
// import dev10.room13.models.Club;



// @RepositoryRestController
// public class ClubController {

//     @Autowired
//     private ClubRepository repo;

//     @PatchMapping("/clubs/{id}")
//     ResponseEntity<Club> update(@RequestBody Club club, @PathVariable int id) {
//         if (club.getClubId() > 0 && club.getClubId() != id) {
//             return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//         }
//         Club updated = repo.save(club);
//         return new ResponseEntity<>(updated, HttpStatus.NO_CONTENT);

//     }
// }


// Use later if needed else delete
