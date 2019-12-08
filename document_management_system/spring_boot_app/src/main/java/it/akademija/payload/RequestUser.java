package it.akademija.payload;


import it.akademija.entity.Group;
import it.akademija.entity.UserDocument;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

public final class RequestUser {

    @NotBlank
    @Size(min = 1, max = 40)
    private String name;

    @NotBlank
    @Size(min = 1, max = 40)
    private String surname;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    private String groupName;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    private Boolean admin;

    private List<UserDocument> userDocuments;

    private Set<Group> userGroups;

    private String group;

    public RequestUser(String name, String surname, String email, String groupName, boolean admin) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.groupName = groupName;
        this.admin = admin;
    }

    public RequestUser() {
    }

    public RequestUser(String name, String surname, String email, List<UserDocument> userDocuments) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.userDocuments = userDocuments;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public List<UserDocument> getUserDocuments() {
        return userDocuments;
    }

    public void setUserDocuments(List<UserDocument> userDocuments) {
        this.userDocuments = userDocuments;
    }

    public Set<Group> getUserGroups() {
        return userGroups;
    }

    public void setUserGroups(Set<Group> userGroups) {
        this.userGroups = userGroups;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }
}
