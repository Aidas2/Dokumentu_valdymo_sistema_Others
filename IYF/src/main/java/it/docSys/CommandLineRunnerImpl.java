package it.docSys;

import it.docSys.DTO.LoginDTO;
import it.docSys.configs.UserDBLoader;
import it.docSys.entities.Role;
import it.docSys.enums.Roles;
import it.docSys.repository.*;
import it.docSys.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineRunnerImpl implements CommandLineRunner {


    private final Logger logger = LoggerFactory.getLogger(CommandLineRunnerImpl.class);
    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private
    UserRepository userRepository;


    @Autowired
    private
    UserDBLoader userDBLoader;


    public CommandLineRunnerImpl(UserService userService,
                                 RoleRepository roleRepository,
                                 UserRepository userRepository,
                                 UserDBLoader userDBLoader) {

        this.userService = userService;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.userDBLoader = userDBLoader;
    }

    public Logger getLogger() {
        return logger;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public RoleRepository getRoleRepository() {
        return roleRepository;
    }

    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDBLoader getUserDBLoader() {
        return userDBLoader;
    }

    public void setUserDBLoader(UserDBLoader userDBLoader) {
        this.userDBLoader = userDBLoader;
    }

    @Override
    public void run(String... args) throws Exception {


        boolean letsAddUsers = true;
        int docUsers = 2;
        int roles = 2;


        if (letsAddUsers
                && roleRepository.count() == 0
                && userRepository.count() == 0) {

            userDBLoader.load2UsersToDB(docUsers, roles);
        }

            }

        }

