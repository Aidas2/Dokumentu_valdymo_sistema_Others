package it.akademija.util;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import it.akademija.entity.Role;
import it.akademija.entity.RoleName;
import it.akademija.entity.User;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String...args) throws Exception {

        if(!roleRepository.existsById(1L) && !roleRepository.existsById(2L)) {
            Role role1 = new Role();
            role1.setName(RoleName.ROLE_ADMIN);
            Role role2 = new Role();
            role2.setId(2L);
            role2.setName(RoleName.ROLE_USER);
            roleRepository.save(role1);
            roleRepository.save(role2);
        }

        if(!userRepository.existsById(1L)) {
            Role userrole = roleRepository.findByName(RoleName.ROLE_ADMIN);
            User admin = new User();
            admin.setId(1L);
            admin.setName("Adminas");
            admin.setSurname("Adminavicius");
            admin.setEmail("admin@email.com");
            admin.setAdmin(true);
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRoles(Collections.singleton(userrole));
            userRepository.save(admin);
        }

    }
}