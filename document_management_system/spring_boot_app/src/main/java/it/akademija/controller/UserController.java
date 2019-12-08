package it.akademija.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import it.akademija.dto.TopGroupUser;
import it.akademija.service.UserListRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.UserDTO;
import it.akademija.entity.User;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.RequestUser;
import it.akademija.payload.UserIdentityAvailability;
import it.akademija.repository.UserRepository;
import it.akademija.security.CurrentUser;
import it.akademija.security.UserPrincipal;
import it.akademija.service.UserService;
import it.akademija.util.WriteDataToCSV;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@Api(value="user")
@RequestMapping(value = "/api/users")
public class UserController {

    public final UserService userService;
    public final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }


    @RequestMapping(
            value = "/findByEmailOrSurname",
            method = RequestMethod.GET)
    public Page<UserDTO> getAllUsersByEmailOrSurname(UserListRequest request, Pageable pageable) {
        return userService.findAllUsersByEmailOrSurname(request, pageable);
    }

    @GetMapping("/{email}/{name}/userDocuments")
    public List<Object[]> findUsersBySubmittedDocuments(@PathVariable final String email, @PathVariable final String name) {

        return userService.getUsersByGroupSubmittedDocuments(email, name);
    }


    @GetMapping("/{email}/test/info")
    public int [] userSubmittedDocumentCount(@PathVariable final String email) {

        return userService.getUserDocumentCount(email);
    }
    @RequestMapping(path="/new", method = RequestMethod.POST)
    @ApiOperation(value="Create user", notes = "Creates new user")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(
            @ApiParam(value="User data", required=true)
            @RequestBody final RequestUser requestUser){

        log.info("The user {} created", requestUser);

        userService.createUser(requestUser);
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public UserDTO getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new IllegalArgumentException("No current user apparent");
        }

        UserDTO user = new UserDTO(
                currentUser.getAdmin(),
                currentUser.getEmail(),
                currentUser.getName(),
                currentUser.getSurname()
        );
        return user;
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        log.info("Availability of email:{}checked", email);
        return new UserIdentityAvailability(isAvailable);
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value="Get all users", notes="Returns list of all users")
    public List<UserDTO> getAllUsers() {
        return userService.getUserWithoutDocuments();
    }

    @GetMapping("/pages")
    public Page<UserDTO> pathParamUsers(Pageable pageable) {
        return userService.listUsersByPage(pageable);
    }

    @RequestMapping(path = "/emails", method = RequestMethod.GET)
    @ApiOperation(value="Get all emails", notes="Returns list of all emails")
    public List<UserDTO> getAllUsersEmails() {
       return userService.getUserEmails();
    }

    @RequestMapping(path = "/{email}", method = RequestMethod.GET)
    @ApiOperation(value = "Get one user", notes = "Returns one user by email")
    public UserDTO getUser(
            @PathVariable final String email) {
        log.info("Returns the user, who's email: {}", email);
        return userService.getUser(email);
    }


    @RequestMapping(path = "/{email}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="Delete user", notes="Deletes user by surname")
    public void deleteUser(@PathVariable final String email){
        userService.deleteUser(email);
    }

    @RequestMapping(path = "/{email}/{groupName}/add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value="Add group to a user", notes="Adds group to selected user")
    public void addUserGroup(
            @PathVariable final String email,
            @PathVariable final String groupName
    ){
        userService.addGroupToUser(email,groupName);
    }

    @RequestMapping(path = "/{email}/{groupName}/remove", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value="Remove group", notes="Remove group form users groups list")
    public void removeGroupFromUser(
            @PathVariable final String email,
            @PathVariable final String groupName
    ){
        userService.removeGroupFromUser(email, groupName);
    }

    @RequestMapping(path = "/{email}/edit", method = RequestMethod.PUT)
    @ApiOperation(value = "Get and update user", notes = "Returns user by email and updates user info")
    @ResponseStatus(HttpStatus.OK)
    public void updateUser(
            @ApiParam(value = "User data", required = true)
            @RequestBody RequestUser request,
            @PathVariable final String email) {
        userService.editUser(request, email);
    }

    @GetMapping("/download/csv")
    public void downloadCSV(HttpServletResponse response) throws IOException{
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file=user.csv");

        List<User> users = (List<User>) userRepository.findAll();
        WriteDataToCSV.writeUsersToCSV(response.getWriter(), users);
    }


    @GetMapping("/{email}/download/documentsCsv")
    public void downloadUserDocumentsCSV(HttpServletResponse response, @PathVariable final String email) throws IOException{
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file=vartotojas.csv");

        User user = userRepository.findByEmail(email);
        String.valueOf(user);

        WriteDataToCSV.writeUserDocumentsToCSV(response.getWriter(), user);
    }


    @GetMapping("/{email}/download/userCsv")
    public void downloadUserCSV(HttpServletResponse response, @PathVariable final String email) throws IOException{
        if (StringUtils.isEmpty(email)) {
            throw new IllegalArgumentException("Passed email cannot be empty!");
        }

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; file=vartotojas.csv");

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User with email " + email + " does not exist!");
        }

        String.valueOf(user);

        WriteDataToCSV.writeUserByEmailToCSV(response.getWriter(), user);
    }

}
