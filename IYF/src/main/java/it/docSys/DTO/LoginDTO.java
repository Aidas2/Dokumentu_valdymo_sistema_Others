package it.docSys.DTO;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class LoginDTO {

    @NotBlank(message = "Username is needed")
    @Size(min = 2, max = 15, message = "username must be 4-15 characters long")
    private String username;

    @NotBlank(message = "Password needed")
    @Size(min = 8, message = "password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "Firstname is required")
    @Size(min = 2, max = 50, message = "firstname must be 2-20 characters long")
    private String firstname;

    @NotBlank(message = "Lastname is required")
    @Size(min = 2, max = 50, message = "lastname must be 2-30 characters long")
    private String lastname;


    @NotNull(message = "Admin status is required")
    private String role;

    public LoginDTO(@NotNull(message = "Username is required") String username,
                             @NotNull(message = "Password is required") String password,
                             @NotNull(message = "Firstname is required") String firstname,
                             @NotNull(message = "Lastname is required") String lastname,
                             @NotNull(message = "Role is required") String role) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
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

    public String getRole() {
        return role;
    }

    public void setRole(String roles) {
        this.role= role;
    }


    }

