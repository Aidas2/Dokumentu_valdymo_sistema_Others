package it.akademija.controller;

import java.net.URI;
import java.util.Collections;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import it.akademija.entity.Group;
import it.akademija.entity.Role;
import it.akademija.entity.RoleName;
import it.akademija.entity.User;
import it.akademija.payload.ApiResponse;
import it.akademija.payload.JwtAuthenticationResponse;
import it.akademija.payload.LoginRequest;
import it.akademija.payload.RequestUser;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;
import it.akademija.security.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final GroupRepository groupRepository;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository,
            PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider, GroupRepository groupRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.groupRepository = groupRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/newUser")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RequestUser requestUser) {
        if(userRepository.existsByEmail(requestUser.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "User email is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        Group group = Optional.ofNullable(requestUser.getGroupName())
                .map(groupRepository::findByname)
                .orElse(null);

        if (group == null) {
            return new ResponseEntity(new ApiResponse(false, "No such group exists " + requestUser.getGroupName()),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(
                requestUser.getName(),
                requestUser.getSurname(),
                requestUser.getEmail(),
                passwordEncoder.encode(requestUser.getPassword()),
                requestUser.getAdmin()
        );

        user.addGroup(group);
        group.addUser(user);

        Role userRole1 = roleRepository.findByName(RoleName.ROLE_USER);
        Role userRole2 = roleRepository.findByName(RoleName.ROLE_ADMIN);

        if(requestUser.getAdmin() == true){
            log.info("Admin role was set");
            user.setRoles(Collections.singleton(userRole2));

        } else {
            log.info("User's role was set");
            user.setRoles(Collections.singleton(userRole1));
        }

        log.info("User "+ user+ "saved to User Repository");
        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{email}")
                .buildAndExpand(result.getEmail()).toUri();

        log.info("User {} has been created", user);
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
