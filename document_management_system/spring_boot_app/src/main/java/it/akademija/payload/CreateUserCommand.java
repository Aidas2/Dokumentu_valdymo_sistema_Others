package it.akademija.payload;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

public final class CreateUserCommand {
    @NotNull
    @NotEmpty(message = "*Please provide username")
    @Length(min = 3, message = "Username cannot be shorter than 3 characters")
    private String username;

    public CreateUserCommand() {
    }

    public CreateUserCommand(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
