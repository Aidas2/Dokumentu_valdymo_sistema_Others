package it.akademija.wizards.models.user;

import java.util.List;

public class UserPageGetCommand {

    private List<UserGetCommand> userList;
    private long totalElements;
    private int totalPages;

    public UserPageGetCommand(List<UserGetCommand> userList, long totalElements, int totalPages) {
        this.userList = userList;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<UserGetCommand> getUserList() {
        return userList;
    }

    public void setUserList(List<UserGetCommand> userList) {
        this.userList = userList;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
