package it.akademija.service;

import java.util.*;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import it.akademija.dto.TopGroupUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import it.akademija.dto.UserDTO;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.RequestUser;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.PagedUserRepository;
import it.akademija.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {


    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final GroupRepository groupRepository;
    private final PagedUserRepository pagedUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final EntityManager em;
    private final UserSpecification userSpecification;


    @Autowired
    public UserService(EntityManager em, UserRepository userRepository, DocumentRepository documentRepository, GroupRepository groupRepository, PagedUserRepository pagedUserRepository, PasswordEncoder passwordEncoder, UserSpecification userSpecification) {
        this.em = em;
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
        this.groupRepository = groupRepository;
        this.pagedUserRepository = pagedUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.userSpecification = userSpecification;
    }

    public Page<UserDTO> findAllUsersByEmailOrSurname(UserListRequest request, Pageable pageable) {
        Page<User> userPage = pagedUserRepository.findAll(userSpecification.getFilter(request), pageable);
        final Page<UserDTO> userDtoPage = userPage.map(this::convertToUserDto);

        return userDtoPage;
    }

    @Transactional
    public List<Object[]> getUsersByGroupSubmittedDocuments(String email, String group) {
        List<Object[]> list = userRepository.getUsersByGroupSubmittedDocuments(email, group);
        System.out.println("listas " + list);
        return list;
    }

    @Transactional
    public List<UserDTO> getUserWithoutDocuments() {
        //log.info("Finding all users");
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                        user.getName(),
                        user.getSurname(),
                        user.getEmail(),
                        user.getAdmin()
                        ))
                .collect(Collectors.toList());
    }

    @Transactional
    public int[] getUserDocumentCount(String email){
       int [] countArray = new int [4];

      int allCount = documentRepository.getUserDocumentCount(email);
      int submittedCount = documentRepository.getUserSubmittedDocumentCount(email);
      int confirmedCount = documentRepository.getUserConfirmedDocumentCount(email);
      int rejectedCount = documentRepository.getUserRejectedDocumentCount(email);

        countArray [0] = allCount;
        countArray [1] = submittedCount;
        countArray [2] = confirmedCount;
        countArray [3] =rejectedCount;

      return countArray;
    }

    @Transactional
    public Page<UserDTO> listUsersByPage(Pageable pageable) {
        Page<User> userPage = pagedUserRepository.findAll(pageable);
        final Page<UserDTO> userDtoPage = userPage.map(this::convertToUserDto);
        return userDtoPage;
    }

    private UserDTO convertToUserDto(final User user) {
        final UserDTO userDTO = new UserDTO(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getAdmin(),
                user.getUserGroups(),
                user.getUserDocuments()
        );
        log.info("Returns user mapped to UserDTO "+ user);
        return userDTO;
    }


    @Transactional
    public List<UserDTO> getUserEmails() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO getUser(String email){
        log.info("Finding one user");
        User user = getExistingUser(email);

        UserDTO userDTO = new UserDTO(
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getAdmin(),
                user.getUserGroups(),
                user.getUserDocuments()
        );
        log.info("Found {} user", user.getEmail());
        return userDTO;
    }


    @Transactional
    public void createUser(RequestUser requestUser) {
        Group group = getExistingGrop(requestUser.getGroupName());
        User user = new User(
                requestUser.getName(),
                requestUser.getSurname(),
                requestUser.getEmail(),
                passwordEncoder.encode(requestUser.getPassword()),
                requestUser.getAdmin()
        );
        user.addGroup(group);
        userRepository.save(user);
        group.addUser(user);
    }

    @Transactional
    public void editUser(RequestUser request, String originalEmail){
        User user = getExistingUser(originalEmail);

        String name = request.getName();
        String surname = request.getSurname();
        Boolean admin = request.getAdmin();
        String password = request.getPassword();


        if (!StringUtils.isEmpty(name)) {
            user.setName(name);
        }
        if (!StringUtils.isEmpty(surname)) {
            user.setSurname(surname);
        }
        if (admin != null) {
            user.setAdmin(admin);
        }
        if (!StringUtils.isEmpty(password)) {
            user.setPassword(passwordEncoder.encode(password));
        }

        log.info("Saving user's email");
        userRepository.save(user);

    }

    @Transactional
    public void deleteUser(String email){
        User user = getExistingUser(email);
        log.info("User {} has been deleted " +  email);

        userRepository.delete(user);
    }


    @Transactional
    public void addGroupToUser(String email, String groupName){
        User user = getExistingUser(email);

        Group group = getExistingGrop(groupName);
        user.addGroup(group);
        userRepository.save(user);
        log.info("Adds the user {} to the group {}", user, group);
        group.addUser(user);
    }

    @Transactional
    public void removeGroupFromUser(String email, String groupName) {
        if (email == null || groupName == null) {
            throw new IllegalArgumentException("Input of email of group name cannot be null.");
        }

        //log.info("Trying to remove user with email "+ email + "from group with name "+groupName);
        User user = getExistingUser(email);
        Group group = getExistingGrop(groupName);

        Set<Group> userGroups = user.getUserGroups();

        if (!userGroups.contains(group)) {
            throw new ResourceNotFoundException("the group is not found");
        } else {
            log.info("User {} has been removed from group {}", email, groupName);
            user.removeGroup(group);
        }
    }

    private User getExistingUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User with email " + email + " does not exist!");
        }
        return user;
    }

    private Group getExistingGrop(String groupName) {
        Group group = groupRepository.findByname(groupName);
        if (group == null) {
            throw new ResourceNotFoundException("Group with name " + groupName + " does not exist!");
        }
        return group;
    }

}
