package it.akademija.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.akademija.dto.GroupDTO;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.payload.RequestGroup;
import it.akademija.payload.RequestUser;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class GroupService {


    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Autowired
    public GroupService(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<GroupDTO> getGroups() {
        //log.info("Returns groups");
        return groupRepository.findAll()
                .stream()
                .map(type -> new GroupDTO(
                        type.getName()))
                .collect(Collectors.toList());
    }

    @Transactional
    public GroupDTO getGroupByName(String name){ //arba IncomingRequestBody request
        Group group = groupRepository.findByname(name);
        GroupDTO groupDTO = new GroupDTO(
                group.getName(),
                group.getGroupUsers()
        );
        //log.info("Returns group "+name);
        return groupDTO;
    }

    @Transactional
    public void createGroup(RequestGroup request) {
        String groupName = request.getName();

        if (groupRepository.existsByName(groupName)) {
            throw new IllegalArgumentException("Group already exists");
        }

        Group group = new Group(
                new Long(0),
                groupName
        );
        log.info("Group {} is saved", groupName);
        groupRepository.save(group);
    }

    @Transactional
    public void deleteGroup(String name){
        log.info("Group {} deleted", name);
        Group group = groupRepository.findByname(name);
        groupRepository.delete(group);
    }

    @Transactional
    public void editGroup(RequestGroup request, String name){
        log.info("Group {} has been edited", name);
        Group group = groupRepository.findByname(name);

        group.setName(request.getName());

    }

    @Transactional
    public void addUserToGroup(String name, RequestUser request){
        log.info("User {} has been added to the group {}", request, name);
        Group group = groupRepository.findByname(name);

        User user = userRepository.findByEmail(request.getEmail());

        user.addGroup(group);
    }


    @Transactional
    public void removeUserFromGroup(String name, RequestUser request){
        log.info("User {} has been removed from  the group {}",request, name);
        Group group = groupRepository.findByname(name);

        User user = userRepository.findByEmail(request.getEmail());

        user.removeGroup(group);

    }
}
