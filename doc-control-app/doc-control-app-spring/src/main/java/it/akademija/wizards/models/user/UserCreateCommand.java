package it.akademija.wizards.models.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserCreateCommand {

    @NotBlank(message = "Username is required")
    @Size(min = 2, max = 15, message = "username must be 2-15 characters long")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "password must be at least 8 characters long")
    private String password;

    @NotBlank(message = "Firstname is required")
    @Size(min = 2, max = 50, message = "firstname must be 2-50 characters long")
    private String firstname;

    @NotBlank(message = "Lastname is required")
    @Size(min = 2, max = 50, message = "lastname must be 2-50 characters long")
    private String lastname;

    @Email(message = "Email format is invalid")
    private String email;

    @NotNull(message = "Admin status is required")
    private boolean isAdmin;

    public UserCreateCommand(@NotNull(message = "Username is required") String username,
                             @NotNull(message = "Password is required") String password,
                             @NotNull(message = "Firstname is required") String firstname,
                             @NotNull(message = "Lastname is required") String lastname,
                             @Email(message = "Email format is invalid") String email,
                             @NotNull(message = "Admin status is required") boolean isAdmin) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.isAdmin = isAdmin;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
