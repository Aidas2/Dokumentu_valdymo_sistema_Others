package it.akademija.wizards.services;

import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.entities.UserGroup;
import it.akademija.wizards.models.user.UserGetCommand;
import it.akademija.wizards.models.usergroup.GroupAddUsersCommand;
import it.akademija.wizards.models.usergroup.UserGroupCreateCommand;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.repositories.UserGroupRepository;
import it.akademija.wizards.repositories.UserRepository;
import it.akademija.wizards.services.auxiliary.Auth;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserGroupService {

    private UserGroupRepository userGroupRepository;
    private UserRepository userRepository;

    @Autowired
    public UserGroupService(UserGroupRepository userGroupRepository, UserRepository userRepository) {
        this.userGroupRepository = userGroupRepository;
        this.userRepository = userRepository;
    }

    public UserGroupRepository getUserGroupRepository() {
        return userGroupRepository;
    }

    public void setUserGroupRepository(UserGroupRepository userGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    @Transactional(readOnly = true)
    public List<UserGroupGetCommand> getUserGroups() {
        return userGroupRepository.findAll(Sort.by(Sort.Order.asc("title").ignoreCase())).stream().map(userGroup -> {
            UserGroupGetCommand userGroupGetCommand = new UserGroupGetCommand();
            BeanUtils.copyProperties(userGroup, userGroupGetCommand);
            return userGroupGetCommand;
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserGroupGetCommand getUserGroup(String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        UserGroupGetCommand userGroupGetCommand = new UserGroupGetCommand();
        BeanUtils.copyProperties(userGroup, userGroupGetCommand);
        return userGroupGetCommand;
    }

    @Transactional
    public void createUserGroup(UserGroupCreateCommand userGroupCreateCommand) {
        UserGroup userGroup = new UserGroup();
        BeanUtils.copyProperties(userGroupCreateCommand, userGroup);
        userGroupRepository.save(userGroup);
        log.info("Vartotojas '" + Auth.getUsername() + "' sukūrė naują grupę '" + userGroup.getTitle() + "'.");
    }

    @Transactional
    public void updateUserGroup(UserGroupCreateCommand userGroupCreateCommand, String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        String oldUserGroupTitle = userGroup.getTitle();
        BeanUtils.copyProperties(userGroupCreateCommand, userGroup);
        userGroupRepository.save(userGroup);
        log.info("Vartotojas '" + Auth.getUsername() + "' pakeitė grupės '" + oldUserGroupTitle + "' pavadinimą į '" + userGroup.getTitle() + "'.");
    }

    @Transactional
    public void deleteUserGroup(String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        if (userGroup != null) {
            for (DocumentType submissionDocumentType: userGroup.getSubmissionDocumentType()) {
                submissionDocumentType.removeSubmissionUserGroup(userGroup);
            }
            for (DocumentType reviewDocumentType: userGroup.getReviewDocumentType()) {
                reviewDocumentType.removeReviewUserGroup(userGroup);
            }
            userGroupRepository.deleteById(id);
            log.info("Vartotojas '" + Auth.getUsername() + "' ištrynė grupę '" + userGroup.getTitle() + "'.");
        }
    }

    @Transactional
    public List<UserGetCommand> addUsersToGroup(GroupAddUsersCommand groupAddUsersCommand, String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        Set<User> currentGroupUsers = userGroup.getUsers();
        if (userGroup != null) {
            List<User> userList = userRepository.findAllByUsernameIn(groupAddUsersCommand.getUsers());
            userGroup.setUsers(new HashSet<>(userList));
            userGroupRepository.save(userGroup);
            log.info("Vartotojas '" + Auth.getUsername() + "' į grupę '" + userGroup.getTitle() + "' įtraukė naujus vartotojus arba pašalino buvusius.");
            //TO DO
            //Čia reikėtų iki naujo sąrašo užtvirtinimo, nuskaityti esamą ir tada palyginti abu sąrašus.
            return getGroupsUsers(id);
        } else {
            throw new NullPointerException("User group does not exist");
        }
    }

    @Transactional(readOnly = true)
    public List<UserGetCommand> getGroupsUsers(String id) {
        UserGroup userGroup = userGroupRepository.findById(id).orElse(null);
        if (userGroup != null) {
            return userGroup.getUsers().stream().map(user -> {
                UserGetCommand userGetCommand = new UserGetCommand();
                BeanUtils.copyProperties(user, userGetCommand);
                return userGetCommand;
            }).collect(Collectors.toList());
        } else {
            throw new NullPointerException("User group does not exist");
        }
    }
    @Transactional
    public void addUserToGroup(String groupID, String username) {
        UserGroup userGroup =  userGroupRepository.findById(groupID).orElse(null);
        if(userGroup != null){
            User user = userRepository.findByUsername(username);
            if(user != null){
                userGroup.addUser(user);
                userGroupRepository.save(userGroup);
            }
        }else {
            throw new NullPointerException("Group with id: " + groupID + " does not exists");
        }
    }
    @Transactional
    public void removeUserFromGroup(String groupID, String username) {
        UserGroup userGroup =  userGroupRepository.findById(groupID).orElse(null);
        if(userGroup != null){
            User user = userRepository.findByUsername(username);
            if(user != null){
                userGroup.removeUser(user);
                userGroupRepository.save(userGroup);
            }
        }else {
            throw new NullPointerException("Group with id: " + groupID + " does not exists");
        }
    }
}
