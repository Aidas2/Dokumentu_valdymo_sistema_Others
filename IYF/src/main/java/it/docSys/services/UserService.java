package it.docSys.services;

import it.docSys.DTO.*;
import it.docSys.entities.DocUser;
import it.docSys.entities.Document;
import it.docSys.entities.GroupEntity;
import it.docSys.repository.DocumentRepository;
import it.docSys.repository.GroupRepo;
import it.docSys.repository.RoleRepository;
import it.docSys.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepo groupRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService() {
    }

    public UserService(UserRepository userRepository, GroupRepo groupRepository
    ) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    @Transactional
    public void addTwoUsersForLogin(LoginDTO loginDTO) {

        DocUser user = new DocUser();
        user.setUserName(loginDTO.getUsername());
        user.setFirstName(loginDTO.getFirstname());
        user.setLastName(loginDTO.getLastname());
        user.setPassword((bCryptPasswordEncoder.encode(loginDTO.getPassword())));
        user.setRoles(loginDTO.getRole());
        BeanUtils.copyProperties(loginDTO, user);
         userRepository.save(user);
        }


    @Transactional(readOnly = true)
    public List<UserGetDTO> findAllUser() {
        return userRepository.findAll().stream().map((user) ->
                new UserGetDTO(user.getDocUserId(), user.getUserName(), user.getFirstName(), user.getLastName(),
                        user.getPassword(), user.getRoles())).collect(Collectors.toList());
    }


    @Transactional
    public UserGetDTO get(Long id) {
        DocUser user = userRepository.getOne(id);
        if (user != null) {
            return new UserGetDTO(user.getDocUserId(), user.getUserName(), user.getFirstName(), user.getLastName(),
                    user.getPassword(), user.getRoles()
            );
        }
        return null;
    }

    @Transactional
    public void createUser(UserPutDTO userputDTO) {
        DocUser user = new DocUser();
        user.setUserName(userputDTO.getUserName());
        user.setFirstName(userputDTO.getFirstName());
        user.setLastName(userputDTO.getLastName());
        user.setPassword((bCryptPasswordEncoder.encode(userputDTO.getPassword())));
        user.setRoles(userputDTO.getRoles());
        userRepository.save(user);
    }

    @Transactional
    public void updateUser(Long userId, UserPutDTO userputDTO) {
        DocUser user = userRepository.getOne(userId);
        if (user != null) {
            user.setUserName(userputDTO.getUserName());
            user.setFirstName(userputDTO.getFirstName());
            user.setLastName(userputDTO.getLastName());
            user.setPassword((bCryptPasswordEncoder.encode(userputDTO.getPassword())));
            user.setRoles(userputDTO.getRoles());
        }
    }

    @Transactional
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }


    @Transactional
    public void assignUserToGroup(Long docUserId, Long groupId) {
        GroupEntity group = groupRepository.getOne(groupId);
        DocUser user = userRepository.getOne(docUserId);
        if (group != null) {
            group.getDocUsers().add(user);
        }
        groupRepository.save(group);
    }


    @Transactional
    public List<GroupGetDTO> getUserGroups(String username) {
        DocUser user = userRepository.findByUserName(username);
        if (user != null) {
            return user.getGroups().stream().map(group ->
                    new GroupGetDTO(group.getId(), group.getTitle())).collect(Collectors.toList());
        }
        return null;
    }

    @Transactional
    public void assignDocumentToUser(Long docId, String userName) {
        DocUser user = userRepository.findByUserName(userName);
        Document document = documentRepository.getOne(docId);
        if (user != null) {
            user.getDocuments().add(document);
            userRepository.save(user);
        } else {
            throw new NullPointerException("There is no user with that name");
        }
    }


    @Transactional
    public List<TestDocDTO> getUserDocuments(String username) {
        DocUser user = userRepository.findByUserName(username);
        if (user != null) {
            return user.getDocuments().stream().map(document ->
                    new TestDocDTO(document.getId(), document.getTitle(), document.getType(),
                            document.getAuthor())).collect(Collectors.toList());
        } else {
            throw new NullPointerException("There is no user with that name");

        }
    }
}

