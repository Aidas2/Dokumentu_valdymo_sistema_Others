package it.akademija.dto;

import it.akademija.entity.User;

import java.util.HashSet;
import java.util.Set;

public class GroupDTO {

    private String name;

    private Set<User> groupUsers = new HashSet<User>();

    public GroupDTO() {
    }

    public GroupDTO(String name, Set<User> groupUsers) {
        this.name = name;
        this.groupUsers = groupUsers;
    }

    public GroupDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getGroupUsers() {
        return groupUsers;
    }

    public void setGroupUsers(Set<User> groupUsers) {
        this.groupUsers = groupUsers;
    }
}
