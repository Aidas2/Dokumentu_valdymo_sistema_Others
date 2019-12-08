package it.akademija.wizards;

import it.akademija.wizards.entities.Role;
import it.akademija.wizards.enums.RoleName;
import it.akademija.wizards.models.documenttype.DocumentTypeCreateCommand;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.models.user.UserAddGroupsCommand;
import it.akademija.wizards.models.user.UserCreateCommand;
import it.akademija.wizards.models.usergroup.UserGroupCreateCommand;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.repositories.*;
import it.akademija.wizards.services.DocumentTypeService;
import it.akademija.wizards.services.UserGroupService;
import it.akademija.wizards.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CommandLineAppRunner implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(CommandLineAppRunner.class);
    @Autowired
    private UserService userService;

    @Autowired
    private DocumentTypeService documentTypeService;

    @Autowired
    private UserGroupService userGroupService;

    // REPOSITORIES
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private
    UserGroupRepository userGroupRepository;
    @Autowired
    private
    DocumentTypeRepository documentTypeRepository;
    @Autowired
    private
    UserRepository userRepository;
    @Autowired
    private
    DocumentRepository documentRepository;

    @Autowired
    private
    DatabaseFiller databaseFiller;
    @Autowired
    private DataBaseFillerWithFaker dataBaseFillerWithFaker;

    @Override
    public void run(String... args) throws Exception {

        // Change if you want to fill in databse with random data on startup
        boolean fillInDatabase = false;
        int groups = 17;
        int users = 381;
        int docTypes = 19;
        int avqDocsForUser = 19;

        // ONLY FOR FIRST RUN WITH EMPTY DATABASE AND FILL IN ENABLED
        if (fillInDatabase
                && roleRepository.count() == 0
                && userRepository.count() == 0
                && userGroupRepository.count() == 0
                && documentRepository.count() == 0
                && documentTypeRepository.count() == 0) {

            // ENTER groups, users, docTypes, avgDocsPerUser
            //databaseFiller.fillInDatabaseWithData(groups, users, docTypes, avqDocsForUser);
            dataBaseFillerWithFaker.fillInDatabaseWithData(groups, users, docTypes, avqDocsForUser);
        }

            //ROLES
            if (!roleExists("ROLE_USER")) roleRepository.save(new Role(RoleName.ROLE_USER));
            if (!roleExists("ROLE_ADMIN")) roleRepository.save(new Role(RoleName.ROLE_ADMIN));
            //GROUPS
            if (!groupExists("administracija")) userGroupService.createUserGroup(new UserGroupCreateCommand("administracija"));
            if (!groupExists("darbuotojai")) userGroupService.createUserGroup(new UserGroupCreateCommand("darbuotojai"));
            if (!groupExists("statybininkai")) userGroupService.createUserGroup(new UserGroupCreateCommand("statybininkai"));
            if (!groupExists("programisiai")) userGroupService.createUserGroup(new UserGroupCreateCommand("programisiai"));
            if (!groupExists("programeriai")) userGroupService.createUserGroup(new UserGroupCreateCommand("programeriai"));
            //DOCTYPES
            if(!docTypeExists("atostogu prasymas")) documentTypeService.createDocumentType(new DocumentTypeCreateCommand("atostogu prasymas"));
            if(!docTypeExists("atleidimas is darbo")) documentTypeService.createDocumentType(new DocumentTypeCreateCommand("atleidimas is darbo"));
            if(!docTypeExists("paausktinimas pareigose")) documentTypeService.createDocumentType(new DocumentTypeCreateCommand("paausktinimas pareigose"));
            if(!docTypeExists("atlyginimo padidinimas")) documentTypeService.createDocumentType(new DocumentTypeCreateCommand("atlyginimo padidinimas"));
            //USERS
            if (!usernameExists("migle")) userService.createUserForStartUp(new UserCreateCommand("migle", "captain", "Migle", "Babickaite", "captain@captain.lt", true));
            if (!usernameExists("julius")) userService.createUserForStartUp(new UserCreateCommand("julius", "julius", "Julius", "Cerniauskas", "julius@captain.lt", false));
            if (!usernameExists("root")) userService.createUserForStartUp(new UserCreateCommand("root", "root", "Rootas", "Rootauskas", "root@captain.lt", true));
            if (!usernameExists("jonas")) userService.createUserForStartUp(new UserCreateCommand("jonas", "jonas", "Jonas", "Gaidukevicius", "jonas@captain.lt", false));
            if (!usernameExists("andrius")) userService.createUserForStartUp(new UserCreateCommand("andrius", "andrius", "Andrius", "", "andrius@captain.lt", false));
            if (!usernameExists("vytautas")) userService.createUserForStartUp(new UserCreateCommand("vytautas", "vytautas", "Vytautas", "", "vytautas@captain.lt", false));


            //create lists of groups' ids
            List<UserGroupGetCommand> userGroups = userGroupService.getUserGroups();
            List<String> allGroups = new ArrayList<>();
            List<String> administration = new ArrayList<>();
            List<String> employees = new ArrayList<>();
            for (UserGroupGetCommand userGroupGetCommand: userGroups) {
                allGroups.add(userGroupGetCommand.getId());
                if(userGroupGetCommand.getTitle().equals("administracija")) administration.add(userGroupGetCommand.getId());
                if(userGroupGetCommand.getTitle().equals("darbuotojai")) employees.add(userGroupGetCommand.getId());

            }

            //ADD GROUPS TO USERS
            //add all groups to username migle
            userService.addGroupsToUser(new UserAddGroupsCommand(allGroups), "migle");
            //add darbuotojas to username julius
            userService.addGroupsToUser(new UserAddGroupsCommand(employees), "julius");

            //get doctype id
            List<DocumentTypeGetCommand> documentTypes = documentTypeService.getDocumentTypes();
            String docTypeId = null;
            for (DocumentTypeGetCommand documentTypeGetCommand: documentTypes) {
                if (documentTypeGetCommand.getTitle().equals("atostogu prasymas")) {
                    docTypeId = documentTypeGetCommand.getId();
                    System.out.println("yes " + docTypeId);
                }
            }
            //add all groups to doctype submission
            documentTypeService.addGroupsToDocType(docTypeId, "submission", new UserAddGroupsCommand(allGroups));
            //add administracija to doctype review
            documentTypeService.addGroupsToDocType(docTypeId, "review", new UserAddGroupsCommand(administration));
    }

    private boolean roleExists(String roleName) {
        return roleRepository.existsByName(RoleName.valueOf(roleName));
    }

    private boolean docTypeExists(String title) {
        for (DocumentTypeGetCommand documentTypeGetCommand: documentTypeService.getDocumentTypes()) {
            if (documentTypeGetCommand.getTitle().equals(title)) return true;
        }
        return false;
    }

    private boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    private boolean groupExists(String title) {
        for (UserGroupGetCommand userGroupGetCommand: userGroupService.getUserGroups()) {
            if (userGroupGetCommand.getTitle().equals(title)) return true;
        }
        return false;
    }
}


