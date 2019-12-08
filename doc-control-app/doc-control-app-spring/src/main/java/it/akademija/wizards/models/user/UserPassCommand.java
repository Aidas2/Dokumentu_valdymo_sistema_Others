package it.akademija.wizards.models.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserPassCommand {

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "password must be at least 8 characters long")
    private String password;

    public UserPassCommand() {

    }

    public UserPassCommand(@NotNull String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
