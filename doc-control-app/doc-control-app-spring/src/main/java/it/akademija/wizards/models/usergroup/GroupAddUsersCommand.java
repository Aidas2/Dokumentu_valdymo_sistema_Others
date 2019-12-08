package it.akademija.wizards.models.usergroup;

import javax.validation.constraints.NotNull;
import java.util.List;

public class GroupAddUsersCommand {

    @NotNull
    List<String> users;

    public GroupAddUsersCommand() {

    }

    public GroupAddUsersCommand(@NotNull List<String> users) {
        this.users = users;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }
}
