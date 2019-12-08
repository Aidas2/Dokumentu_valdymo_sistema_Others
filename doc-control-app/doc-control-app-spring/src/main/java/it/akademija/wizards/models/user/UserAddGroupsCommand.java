package it.akademija.wizards.models.user;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class UserAddGroupsCommand {

    @NotNull
    private List<String> id;

    public UserAddGroupsCommand() {
        this.id = new ArrayList<>();
    }

    public UserAddGroupsCommand(@NotNull List<String> id) {
        this.id = id;
    }

    public List<String> getId() {
        return id;
    }

    public void setId(List<String> id) {
        this.id = id;
    }
}
