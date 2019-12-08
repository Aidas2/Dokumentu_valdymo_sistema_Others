package it.akademija.wizards.services;

import it.akademija.wizards.entities.*;
import it.akademija.wizards.enums.RoleName;
import it.akademija.wizards.exception.ExceptionFactory;
import it.akademija.wizards.exception.model.AppException;
import it.akademija.wizards.exception.model.BadRequestException;
import it.akademija.wizards.exception.model.ResourceNotFoundException;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.models.user.*;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.repositories.RoleRepository;
import it.akademija.wizards.repositories.UserGroupRepository;
import it.akademija.wizards.repositories.UserRepository;
import it.akademija.wizards.security.payload.ApiResponse;
import it.akademija.wizards.services.auxiliary.Auth;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import lombok.extern.slf4j.Slf4j;

import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService {

    private UserRepository userRepository;
    private UserGroupRepository userGroupRepository;
    private ExceptionFactory exceptionFactory;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    public UserService(final UserRepository userRepository,
                       final UserGroupRepository userGroupRepository,
                       final ExceptionFactory exceptionFactory) {
        this.userRepository = userRepository;
        this.userGroupRepository = userGroupRepository;
        this.exceptionFactory = exceptionFactory;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Transactional(readOnly = true)
    public UserPageGetCommand getUsers(String searchFor, Integer pageNumber, Integer pageLimit) {
        String searchable = searchFor != null ? searchFor.trim().toLowerCase().replace("%", "\\%") : "";
        Pageable pageable;
        Sort sort = Sort.by(Sort.Order.asc("firstname").ignoreCase()).and(Sort.by(Sort.Order.asc("lastname").ignoreCase()));
        if (pageNumber != null && pageLimit != null) {
            pageable = PageRequest.of(pageNumber, pageLimit, sort);
        } else {
            pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        }
        Page<User> pageUser = userRepository.findAllAndSearch(searchable, pageable);
        List<UserGetCommand> userList = pageUser.stream().map(user -> {
            UserGetCommand userGetCommand = new UserGetCommand();
            BeanUtils.copyProperties(user, userGetCommand);
            return userGetCommand;
        }).collect(Collectors.toList());
        return new UserPageGetCommand(userList, pageUser.getTotalElements(), pageUser.getTotalPages());
    }

    @Transactional(readOnly = true)
    public UserGetCommand getUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            UserGetCommand userGetCommand = new UserGetCommand();
            BeanUtils.copyProperties(user, userGetCommand);
            return userGetCommand;
        } else {
            this.exceptionFactory.resourceNotFoundException("User does not exist");
            return null;
        }
    }

    @Transactional
    public ResponseEntity<?> createUser(UserCreateCommand userCreateCommand) {
        if (userRepository.existsByUsername(userCreateCommand.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(userCreateCommand.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        BeanUtils.copyProperties(userCreateCommand, user);
        user.setPassword(passwordEncoder.encode(userCreateCommand.getPassword()));
        Role userRole = null;
        if (userCreateCommand.isAdmin()) {
            userRole = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow(
                    () -> new AppException("Admin Role not set")
            );
        } else {
            userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(
                    () -> new AppException("User Role not set")
            );
        }
        user.getRoles().add(userRole);
        User result = userRepository.save(user);
        log.info("Vartotojas '" + Auth.getUsername() + "' sukūrė naują vartotoją '" + result.getUsername() + "'.");

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @Transactional
    public void createUserForStartUp(UserCreateCommand userCreateCommand) {
        if (userRepository.existsByUsername(userCreateCommand.getUsername())) {
            throw new IllegalArgumentException("User already exists");
        }

        if (userRepository.existsByEmail(userCreateCommand.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        User user = new User();
        BeanUtils.copyProperties(userCreateCommand, user);
        user.setPassword(passwordEncoder.encode(userCreateCommand.getPassword()));
        Role userRole = null;
        if (userCreateCommand.isAdmin()) {
            userRole = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow(
                    () -> new AppException("Admin Role not set")
            );
        } else {
            userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(
                    () -> new AppException("User Role not set")
            );
        }
        user.getRoles().add(userRole);
        userRepository.save(user);
    }

    @Transactional
    public void updateUser(String username, UserUpdateCommand userUpdateCommand) {
        User user = userRepository.findByUsername(username);
        BeanUtils.copyProperties(userUpdateCommand, user);
        Role userRole = null;
        if (userUpdateCommand.isAdmin()) {
            userRole = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow(
                    () -> new AppException("Admin Role not set")
            );
        } else {
            userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(
                    () -> new AppException("User Role not set")
            );
        }
        user.setRoles(new HashSet<>(Arrays.asList(userRole)));
        userRepository.save(user);
        log.info("Vartotojas '" + Auth.getUsername() + "' koregavo vartotojo '" + user.getUsername() + "' duomenis.");
    }

    @Transactional
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            for (UserGroup userGroup : user.getUserGroups()) {
                userGroup.removeUser(user);
            }
            for (Document document : user.getDocuments()) {
                document.setAuthor(null);
            }
            userRepository.delete(user);
            log.info("Vartotojas '" + Auth.getUsername() + "' ištrynė vartotoją '" + user.getUsername() + "'.");
        } else {
            this.exceptionFactory.resourceNotFoundException("User does not exist");
        }
    }

    @Transactional
    public boolean updateUserPassword(String username, UserPassCommand userPassCommand) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(userPassCommand.getPassword()));
            userRepository.save(user);
            log.info("Vartotojas '" + Auth.getUsername() + "' pakeitė vartotojo '" + user.getUsername() + "' slaptažodį.");
            return true;
        }
        return false;
    }

    @Transactional
    public void addGroupsToUser(UserAddGroupsCommand userAddGroupsCommand, String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            List<UserGroup> userGroupList = userGroupRepository.findAllById(userAddGroupsCommand.getId());
            for (UserGroup userGroup : userGroupList) {
                user.addGroup(userGroup);
            }
            userRepository.save(user);
            for (UserGroup userGroup : userGroupList) {
                log.info("Vartotojas '" + Auth.getUsername() + "' įtraukė vartotoją '" + user.getUsername() + "' į grupę '" + userGroup.getTitle() + "'.");
            }
        }
    }

    @Transactional
    public void removeGroupsFromUser(UserRemoveGroupsCommand userRemoveGroupsCommand, String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            List<UserGroup> userGroupList = userGroupRepository.findAllById(userRemoveGroupsCommand.getId());
            for (UserGroup userGroup : userGroupList) {
                user.removeGroup(userGroup);
            }
            userRepository.save(user);
            for (UserGroup userGroup : userGroupList) {
                log.info("Vartotojas '" + Auth.getUsername() + "' pašalino vartotoją '" + user.getUsername() + "' iš grupės '" + userGroup.getTitle() + "'.");
            }
        }
    }

    @Transactional(readOnly = true)
    public List<UserGroupGetCommand> getUsersGroups(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user.getUserGroups().stream().map(userGroup -> {
                UserGroupGetCommand userGroupGetCommand = new UserGroupGetCommand();
                BeanUtils.copyProperties(userGroup, userGroupGetCommand);
                return userGroupGetCommand;
            }).collect(Collectors.toList());
        } else {
            this.exceptionFactory.resourceNotFoundException("User does not exist");
            return null;
        }
    }

    @Transactional
    public Set<DocumentTypeGetCommand> getUserSubmissionDocTypes(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            Set<UserGroup> userGroups = user.getUserGroups();
            Set<DocumentType> submissionDocTypes = new HashSet<>();
            userGroups.forEach(userGroup -> {
                submissionDocTypes.addAll(userGroup.getSubmissionDocumentType());
            });
            return submissionDocTypes.stream().map(documentType -> {
                DocumentTypeGetCommand documentTypeGetCommand = new DocumentTypeGetCommand();
                BeanUtils.copyProperties(documentType, documentTypeGetCommand);
                return documentTypeGetCommand;
            }).collect(Collectors.toSet());
        }
        this.exceptionFactory.resourceNotFoundException("User does not exist");
        return null;
    }

    @Transactional
    public boolean isActionAllowed(String username, String action) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            for (UserGroup userGroup : user.getUserGroups()) {
                if (action.equals("submit")) {
                    if (!userGroup.getSubmissionDocumentType().isEmpty()) return true;
                } else if (action.equals("review")) {
                    if (!userGroup.getReviewDocumentType().isEmpty()) return true;
                }
            }
            return false;
        } else {
            this.exceptionFactory.resourceNotFoundException("User does not exist");
            return false;
        }
    }

    @Transactional
    public Long getUsersCount() {
        return userRepository.count();
    }

    @Transactional
    public List<DocumentTypeGetCommand> getUserReviewDocTypes(String username) {
        return userRepository.findDocTypesUserCanReview(username).stream().map(documentType -> {
            DocumentTypeGetCommand documentTypeGetCommand = new DocumentTypeGetCommand();
            BeanUtils.copyProperties(documentType, documentTypeGetCommand);
            return documentTypeGetCommand;
        }).collect(Collectors.toList());
    }

    @Transactional
    public List<UserGetGroupDocTypes> getUserGroupsWithDocTypes(String username) {
        return userRepository.findByUsername(username).getUserGroups().stream().map(userGroup -> {
            UserGetGroupDocTypes userGetGroupDocTypes = new UserGetGroupDocTypes();
            userGetGroupDocTypes.setGroupTitle(userGroup.getTitle());
            userGetGroupDocTypes.setReviewDocTypes(userGroup.getReviewDocumentType().stream().map(DocumentType::getTitle).collect(Collectors.toList()));
            userGetGroupDocTypes.setSubmitDocTypes(userGroup.getSubmissionDocumentType().stream().map(DocumentType::getTitle).collect(Collectors.toList()));
            return userGetGroupDocTypes;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void addGroupToUser(String username, String groupID) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            UserGroup userGroup = userGroupRepository.findById(groupID).orElse(null);
            if (userGroup != null) {
                user.addOneGroup(userGroup);
                userRepository.save(user);
            }
        }
    }

    @Transactional
    public void removeGroupFromUser(String username, String groupID) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            UserGroup userGroup = userGroupRepository.findById(groupID).orElse(null);
            if (userGroup != null) {
                user.removeOneGroup(userGroup);
                userRepository.save(user);
            }

        }
    }

    @Transactional
    public boolean toggleLockUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            log.error("Vartotojas {} nerastas", username);
            throw new ResourceNotFoundException("User does not exist");
        }
        String targetUsername = user.getUsername();
        String lockerUsername = Auth.getUsername();
        if (!lockerUsername.equals(targetUsername)) {
            boolean status = user.isLocked();
            user.setLocked(!status);

            userRepository.save(user);

            String logAction = status ? " atrakino " : " užrakino ";
            log.info(lockerUsername + logAction + targetUsername);
        } else {
            log.error(lockerUsername + " bandė užrakinti save");
            this.exceptionFactory.badRequestException("OWN_USER_LOCK");
        }
        return user.isLocked();
    }
}
