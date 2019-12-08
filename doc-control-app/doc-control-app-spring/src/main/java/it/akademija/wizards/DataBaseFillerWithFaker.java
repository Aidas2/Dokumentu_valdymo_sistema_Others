package it.akademija.wizards;

import com.github.javafaker.Faker;
import it.akademija.wizards.entities.*;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.enums.RoleName;
import it.akademija.wizards.exception.model.AppException;
import it.akademija.wizards.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class DataBaseFillerWithFaker {
    private static final String pathName = "documents";

    // REPOSITORIES
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserGroupRepository userGroupRepository;
    @Autowired
    private DocumentTypeRepository documentTypeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public void fillInDatabaseWithData(int groups, int users, int docTypes, int avgDocsForUser) throws IOException {
        final int groupsCount = groups;
        final int usersCount = users;
        final int docTypesCount = docTypes;
        final int avgDocsPerUser = avgDocsForUser;

        // Create roles
        createRoles();
        // Create Groups
        createUserGroups(groupsCount);
        // Create Users
        createUsers(usersCount);
        // Create Doctypes
        createDocTypes(docTypesCount);
        // Add users to groups and add doctypes to groups
        addUsersToGroups();
        // Add grous for doc submission and review
        addGroupsForDocTypes();
        // Create documents
        createDocuments(avgDocsPerUser);
    }

    @Transactional
    public void createRoles() {
        roleRepository.save(new Role(RoleName.ROLE_USER));
        roleRepository.save(new Role(RoleName.ROLE_ADMIN));
    }

    @Transactional
    public void createUsers(int usersCount) {
        Faker faker = new Faker();
        //List<User> users = new ArrayList<>();
        Role roleAdmin = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow(
                () -> new AppException("Admin Role not set")
        );
        Role roleUser = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(
                () -> new AppException("User Role not set")
        );
        for (int i = 1; i <= usersCount; i++) {
            boolean isAdmin = (int) Math.floor(Math.random() * 11) < 3;
            User user = new User();
            user.setUsername(faker.ancient().titan().concat("" + i));
            user.setPassword(passwordEncoder.encode("root"));
            user.setFirstname(faker.name().firstName());
            user.setLastname(faker.name().lastName());
            user.setEmail(faker.internet().emailAddress());
            user.setAdmin(isAdmin);
            Role userRole = isAdmin ? roleAdmin : roleUser;
            user.getRoles().add(userRole);
            //users.add(user);
            userRepository.save(user);
        }
        // Add root admin
        User user = new User();
        user.setUsername("root");
        user.setPassword(passwordEncoder.encode("root"));
        user.setFirstname("Rootas");
        user.setLastname("Rootenis");
        user.setEmail("rootas@rooteninc.com");
        user.setAdmin(true);
        user.getRoles().add(roleAdmin);
        //users.add(user);
        userRepository.save(user);
    }

    @Transactional
    public void createUserGroups(int groupsCount) {
        Faker faker = new Faker();
        //List<UserGroup> newUserGroups = new ArrayList<>();
        int i =1;
        while (i <= groupsCount) {
            String newTitle = faker.company().industry();
            if(!userGroupRepository.existsByTitle(newTitle)){
                UserGroup userGroup = new UserGroup();
                userGroup.setTitle(newTitle);
                userGroupRepository.save(userGroup);
                i++;
                //newUserGroups.add(userGroup);
            }

        }
        //userGroupRepository.saveAll(newUserGroups);
    }

    @Transactional
    public void createDocTypes(int docTypesCount) {
        Faker faker = new Faker();
        int i = 1;
        //List<DocumentType> documentTypes = new ArrayList<>();
        while (i <= docTypesCount) {
            String newTitle = faker.book().title();
            if(!documentTypeRepository.existsByTitle(newTitle)){
                DocumentType documentType = new DocumentType();
                documentType.setTitle(newTitle);
                documentTypeRepository.save(documentType);
                i++;
            }

            //documentTypes.add(documentType);
        }
        //documentTypeRepository.saveAll(documentTypes);
    }

    @Transactional
    public void addUsersToGroups() {
        List<User> users = userRepository.findAll().stream().filter(user -> !user.isAdmin()).collect(Collectors.toList());
        List<UserGroup> groups = userGroupRepository.findAll();

        for (int i = 0; i < groups.size(); i++) {
            int usersToAdd = (int) Math.floor(Math.random() * users.size() + 1);
            UserGroup userGroup = groups.get(i);

            // Add users to group
            Set<User> usersListToAdd = new HashSet<>();
            for (int y = 0; y < usersToAdd; y++) {
                User user = users.get((int) Math.floor(Math.random() * usersToAdd));
                usersListToAdd.add(user);
            }
            userGroup.setUsers(usersListToAdd);
            // Save group to database
            userGroupRepository.save(userGroup);
        }
    }

    @Transactional
    public void addGroupsForDocTypes() {
        List<DocumentType> documentTypeList = documentTypeRepository.findAll();
        List<UserGroup> userGroupList = userGroupRepository.findAll();
        int userGroupListSize = userGroupList.size();

        for (DocumentType documentType : documentTypeList) {
            Set<UserGroup> submissionGroups = new HashSet<>();
            Set<UserGroup> reviewGroups = new HashSet<>();
            int submissionGroupsToAdd = (int) Math.floor(Math.random() * userGroupListSize + 1);
            int reviewGroupsToAdd = (int) Math.floor(Math.random() * userGroupListSize + 1);
            for (int i = 0; i < submissionGroupsToAdd; i++) {
                UserGroup userGroup = userGroupList.get((int) Math.floor(Math.random() * userGroupListSize));
                submissionGroups.add(userGroup);
            }
            for (int i = 0; i < reviewGroupsToAdd; i++) {
                UserGroup userGroup = userGroupList.get((int) Math.floor(Math.random() * userGroupListSize));
                reviewGroups.add(userGroup);

            }
            documentType.setSubmissionUserGroups(submissionGroups);
            documentType.setReviewUserGroups(reviewGroups);
            documentTypeRepository.save(documentType);
        }
    }

    @Transactional
    public void createDocuments(int avgDocsPerUser) throws IOException {
        Faker faker = new Faker();
        List<User> users = userRepository.findAll().stream().filter(user -> !user.isAdmin()).collect(Collectors.toList());
        List<DocumentType> documentTypes = documentTypeRepository.findAll();
        int typesSize = documentTypes.size();
        int documentsToCreate = avgDocsPerUser * users.size();
        List<Document> documents = new ArrayList<>();

        while (documentsToCreate > documents.size()) {
            for (User user : users) {
                int docsForUser = (int) Math.floor(Math.random() * (avgDocsPerUser + 1));
                int docsToCreate = docsForUser <= (documentsToCreate - documents.size()) ?
                        docsForUser : (int) Math.floor(Math.random() * ((documentsToCreate - documents.size()) + 1));
                for (int i = 1; i <= docsToCreate; i++) {
                    Document document = new Document();
                    Date creationDate = faker.date().past(60, 5, TimeUnit.DAYS);
                    document.setAuthor(user);
                    document.setCreationDate(creationDate);
                    if (i % 5 == 0) {
                        int index = (int) (Math.random() * users.size() );
                        document.setReviewer(users.get(index));
                        document.setDocumentState(DocumentState.REJECTED);
                        Date submissionDate = faker.date().between(creationDate, new Date());
                        document.setSubmissionDate(submissionDate);
                        Date rejectionDate = faker.date().between(submissionDate, new Date());
                        document.setRejectionDate(rejectionDate);
                        document.setRejectionReason(faker.lebowski().quote());
                    } else if (i % 3 == 0) {
                        document.setDocumentState(DocumentState.ACCEPTED);
                        int index = (int) (Math.random() * users.size() );
                        document.setReviewer(users.get(index));
                        Date submissionDate = faker.date().between(creationDate, new Date());
                        document.setSubmissionDate(submissionDate);
                        Date approvalDate = faker.date().between(submissionDate, new Date());
                        document.setApprovalDate(approvalDate);
                    } else if (i % 2 == 0) {
                        document.setDocumentState(DocumentState.SUBMITTED);
                        Date submissionDate = faker.date().between(creationDate, new Date());
                        document.setSubmissionDate(submissionDate);
                    } else {
                        document.setDocumentState(DocumentState.CREATED);
                    }
                    DocumentType documentType = documentTypes.get((int) Math.floor(Math.random() * typesSize));
                    document.setDocumentType(documentType);
                    document.setTitle(faker.company().industry());
                    document.setDescription(faker.chuckNorris().fact());
                    document.setCreationDate(creationDate);
                    document.setPrefix(UUID.randomUUID().toString());

                    Faker titleFaker = new Faker();
                    Faker textFaker = new Faker();

                    File folder = getDocumentFolder(document);
                    if (!folder.exists()) {
                        boolean mkdirs = folder.mkdirs();
                    }

                    File path = new File(pathName
                            + File.separator
                            + document.getAuthor().getUsername()
                            + File.separator
                            + formatLocalDateTime(convertToLocalDateTimeViaMillisecond(creationDate)));
                    String originalFileName = titleFaker.name().title() + ".pdf";
                    File file = new File(path.getPath(), originalFileName);

                    try (FileOutputStream fileOutputStream = new FileOutputStream(file)) {

                        fileOutputStream.write(textFaker.lorem().character());
                    }


                    Set<PosixFilePermission> perms = new HashSet<>();
                    // add owners permission
                    perms.add(PosixFilePermission.OWNER_READ);
                    perms.add(PosixFilePermission.OWNER_WRITE);
                    perms.add(PosixFilePermission.GROUP_READ);
                    perms.add(PosixFilePermission.GROUP_WRITE);
                    // add others permissions
                    perms.add(PosixFilePermission.OTHERS_READ);
                    Files.setPosixFilePermissions(Paths.get(file.toString()), perms);

                    document.setPath(originalFileName);
                    documents.add(document);
                }
            }
        }
        documentRepository.saveAll(documents);
    }

    private String formatLocalDateTime(LocalDateTime localDateTime) {
        DateTimeFormatter dataTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH:mm:ss", Locale.US);
        return localDateTime.format(dataTimeFormatter);
    }

    private LocalDateTime convertToLocalDateTimeViaMillisecond(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }

    public File getDocumentFolder(Document document) {
        return new File(pathName
                + File.separator
                + document.getAuthor().getUsername()
                + File.separator
                + formatLocalDateTime(
                convertToLocalDateTimeViaMillisecond(document.getCreationDate()
                )
        ));
    }

}
