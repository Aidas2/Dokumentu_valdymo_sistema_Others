package it.docSys.configs;


import it.docSys.entities.DocUser;
import it.docSys.entities.Role;
import it.docSys.enums.Roles;
import it.docSys.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDBLoader {

    // REPOSITORIES
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void load2UsersToDB(int docUsers, int roles) {
        final int numOfUsers = docUsers;
        final int numOfRoles = roles;



        createRoles(numOfRoles);

        addUsers(numOfUsers);

    }

    @Transactional
    public void createRoles(int numOfRoles) {
        roleRepository.save(new Role(Roles.ROLE_ADMIN.name()));
        roleRepository.save(new Role(Roles.ROLE_USER.name()));
    }


    @Transactional
    public void addUsers(int numOfUsers) {
        List<DocUser> users = new ArrayList<>();
        String adminRole = roleRepository.findByName(Roles.ROLE_ADMIN.name()).orElseThrow(
                () -> new NullPointerException("We do not have any Admins yet")
        );
        String userRole = roleRepository.findByName(Roles.ROLE_USER.name()).orElseThrow(
                () -> new NullPointerException("We do not have any Users")
        );



            DocUser user1 = new DocUser();
            user1.setUserName("simpleuser");
            user1.setPassword(bCryptPasswordEncoder.encode("password"));
            user1.setFirstName("ufirstname");
            user1.setLastName("ulastname");
            user1.setRoles(Roles.ROLE_USER.name());
            users.add(user1);
            userRepository.save(user1);
        userRepository.saveAll(users);



        DocUser user = new DocUser();
        user.setUserName("simpleadmin");
        user.setPassword(bCryptPasswordEncoder.encode("apassword"));
        user.setFirstName("afirstname");
        user.setLastName("alastname");
        user.setRoles(Roles.ROLE_ADMIN.name());
        users.add(user);
        userRepository.save(user);
        userRepository.saveAll(users);
    }
    }



