package it.akademija.wizards.models.usergroup;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserGroupCreateCommand {

    @NotBlank(message = "group title is required")
    @Size(min = 2, max = 30, message = "group title must be 2-30 characters long")
    private String title;

    public UserGroupCreateCommand() {

    }

    public UserGroupCreateCommand(@NotNull(message = "group title is required") String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
