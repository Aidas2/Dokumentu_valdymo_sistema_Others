package it.akademija.wizards.models.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserUpdateCommand {

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

    public UserUpdateCommand(@NotNull(message = "Firstname is required") String firstname,
                             @NotNull(message = "Lastname is required") String lastname,
                             @Email(message = "Email format is invalid") String email,
                             @NotNull(message = "Admin status is required") boolean isAdmin) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.isAdmin = isAdmin;
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
