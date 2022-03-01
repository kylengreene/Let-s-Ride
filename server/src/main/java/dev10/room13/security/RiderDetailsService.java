package dev10.room13.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev10.room13.data.RiderRepository;
import dev10.room13.data.RoleRepository;
import dev10.room13.models.Rider;
import dev10.room13.models.Role;

import javax.validation.ValidationException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
public class RiderDetailsService implements UserDetailsService {
    private final RiderRepository riderRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;

    public RiderDetailsService(RiderRepository riderRepository, RoleRepository roleRepository,
                          PasswordEncoder encoder) {
        this.riderRepository = riderRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
        Rider user = riderRepository.findByUsername(username).get();

            if (!user.isEnabled()) {
                throw new UsernameNotFoundException("User is disabled");
            }

            return user;
        } catch (NoSuchElementException ex) {
            throw new UsernameNotFoundException(username + " not found");
        }
    }

    public Rider create(Rider rider, String username, String password) {
        validate(username);
        validatePassword(password);

        password = encoder.encode(password);

        rider.setUsername(username);
        rider.setPassword(password);
        rider.setDisabled(false);
        rider = riderRepository.save(rider);
        Role user = new Role("USER");
        user.setRider(riderRepository.findById(rider.getRiderId()).get());
        roleRepository.save(user);
        rider.setRoles(Set.of(user));
        rider.setAuthorities(Rider.convertRolesToAuthorities(rider.getRoles()));
        return rider;
    }

    private void validate(String username) {
        if (username == null || username.isBlank()) {
            throw new ValidationException("username is required");
        }

        if (username.length() > 50) {
            throw new ValidationException("username must be less than 50 characters");
        }
        if (riderRepository.findByUsername(username).isPresent()) {
            throw new ValidationException("Username already exists");
        }
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 8) {
            throw new ValidationException("password must be at least 8 characters");
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        if (digits == 0 || letters == 0 || others == 0) {
            throw new ValidationException("password must contain a digit, a letter, and a non-digit/non-letter");
        }
    }
}
