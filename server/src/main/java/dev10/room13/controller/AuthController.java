package dev10.room13.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.ValidationException;

import org.springframework.context.annotation.Import;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dev10.room13.models.Rider;
import dev10.room13.security.JwtConverter;
import dev10.room13.security.RiderDetailsService;
import dev10.room13.security.SecurityConfig;

@Import(SecurityConfig.class)
@RestController
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtConverter converter;
    private final RiderDetailsService riderDetailsService;

    public AuthController(AuthenticationManager authenticationManager, JwtConverter converter, RiderDetailsService riderDetailsService) {
        this.authenticationManager = authenticationManager;
        this.converter = converter;
        this.riderDetailsService = riderDetailsService;
    }

    @PostMapping("api/signup")
    @CrossOrigin
    public ResponseEntity<?> createAccount(@RequestBody Map<String, String> credentials) {
        Rider rider = new Rider();


        try {
            String username = credentials.get("username");
            String password = credentials.get("password");
            rider.setRiderFirstname(credentials.get("firstname"));
            rider.setRiderLastname(credentials.get("lastname"));
            rider.setRiderPostal(credentials.get("postal"));

            rider = riderDetailsService.create(rider, username, password);
        } catch (ValidationException ex) {
            return new ResponseEntity<>(List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (DuplicateKeyException ex) {
            return new ResponseEntity<>(List.of("The provided username already exists"), HttpStatus.BAD_REQUEST);
        }

        HashMap<String, Integer> map = new HashMap<>();
        map.put("riderId", rider.getRiderId());

        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    @PostMapping("api/auth")
    @CrossOrigin
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody Map<String, String> credentials) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"));

        try {
            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.isAuthenticated()) {
                String jwtToken = converter.getTokenFromUser((Rider) authentication.getPrincipal());
               SecurityContextHolder.getContext().setAuthentication(authentication);


                HashMap<String, String> map = new HashMap<>();
                map.put("jwt_token", jwtToken);

                return new ResponseEntity<>(map, HttpStatus.OK);
            }

        } catch (AuthenticationException ex) {
            System.out.println(ex);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
