package it.docSys.controllers;

import it.docSys.security.SecurityService;
import it.docSys.security.UserServiceInt;
import it.docSys.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.Api;
import it.docSys.DTO.*;
import it.docSys.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;

@RestController
@Api(value = "DocUser Controller")
@RequestMapping(value = "/api/docUsers")
public class UserController {

    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private UserServiceInt userServiceInt;




    @PostMapping("/create")
    @ApiOperation(value = "Save new user", notes = "Creates new user and saves to database")
    public void save(@RequestBody final UserPutDTO userPutDTO){
        logger.info("A user has been created");
        userService.createUser(userPutDTO);
    }


    @PutMapping("/update/{userId}")
    @ApiOperation(value = "Update existing user")
    public void update(@PathVariable final Long userId, @RequestBody UserPutDTO userPutDTO){
        logger.info("A user has been updated");
        userService.updateUser(userId, userPutDTO);
    }


    @GetMapping(value = "/get/{userId}")
    @ApiOperation(value = "Get user by id", notes = "Returns specific user by id")
    public UserGetDTO getById(
            @ApiParam(value = "userId", required = true)
            @PathVariable final Long userId) {
        logger.info("Specific user has been found");
        return userService.get(userId);
    }


    @GetMapping
    @ApiOperation(value = "Get all users", notes = "Returns all users from database")
    public List<UserGetDTO> getAllDocuments(){
        logger.info("List of all users");
        return userService.findAllUser();
    }


    @DeleteMapping("/delete/{userId}")
    @ApiOperation(value = "Delete user by id")
    public void delete(@ApiParam(value = "userId", required = true) @PathVariable final Long userId){
        logger.info("A user has been deleted");
        userService.deleteUser(userId);
    }


    @PutMapping("/{groupId}/{docUserId}")
    @ApiOperation(value = "Assign user to group")
    public void assignUserToGroup(@PathVariable final Long groupId, @PathVariable final Long docUserId) {
        userService.assignUserToGroup(docUserId, groupId);
    }


    @GetMapping("/{username}/groups")
    @ApiOperation(value = "Get all groups assigned to particular user")
    public List<GroupGetDTO> userGroups (@PathVariable final String username) {
        return userService.getUserGroups(username);
    }


    @PutMapping("/user/{docId}/{userName}")
    @ApiOperation(value = "Assign document to user")
    public void assignDocumentToUser(@PathVariable final Long docId, @PathVariable final String userName) {
        userService.assignDocumentToUser(docId, userName);
    }


    @GetMapping("/user/{username}/documents")
    @ApiOperation(value = "Get all documents assigned to particular user")
    public List<TestDocDTO> userDocuments (@PathVariable final String username) {
        return userService.getUserDocuments(username);
    }


}