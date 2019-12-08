package it.akademija.wizards.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import it.akademija.wizards.models.user.UserGetCommand;
import it.akademija.wizards.models.usergroup.GroupAddUsersCommand;
import it.akademija.wizards.models.usergroup.UserGroupCreateCommand;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.services.UserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "user groups")
@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping(value = "/api/groups")
public class UserGroupController {

    private final UserGroupService userGroupService;

    @Autowired
    public UserGroupController(UserGroupService userGroupService) {
        this.userGroupService = userGroupService;
    }

    @ApiOperation(value = "get groups")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<UserGroupGetCommand> getUserGroups() {
        return userGroupService.getUserGroups();
    }

    @ApiOperation(value = "get group")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserGroupGetCommand getUserGroup(@PathVariable(value = "id") String id) {
        return userGroupService.getUserGroup(id);
    }

    @ApiOperation(value = "create user group")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createUserGroup(@RequestBody UserGroupCreateCommand userGroupCreateCommand) {
        userGroupService.createUserGroup(userGroupCreateCommand);
    }

    @ApiOperation(value = "update user group")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateUserGroup(@RequestBody UserGroupCreateCommand userGroupCreateCommand, @PathVariable(value = "id") String id) {
        userGroupService.updateUserGroup(userGroupCreateCommand, id);
    }

    @ApiOperation(value = "delete user group")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteUserGroup(@PathVariable(value = "id") String id) {
        userGroupService.deleteUserGroup(id);
    }

    @ApiOperation(value = "add user list to group")
    @RequestMapping(value = "/{id}/users", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<UserGetCommand> addUsersToGroup(@RequestBody GroupAddUsersCommand groupAddUsersCommand, @PathVariable(value = "id") String id) {
        return userGroupService.addUsersToGroup(groupAddUsersCommand, id);
    }

    @ApiOperation(value = "Add user to group")
    @RequestMapping(value = "/{groupID}/users/{username}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addUserToGroup(@PathVariable("groupID") final String groupID, @PathVariable("username") final String username){
        userGroupService.addUserToGroup(groupID, username);
    }

    @ApiOperation(value = "Remove user from group")
    @RequestMapping(value = "/{groupID}/users/{username}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeUserFromGroup(@PathVariable("groupID") final String groupID, @PathVariable("username") final String username){
        userGroupService.removeUserFromGroup(groupID, username);
    }

    @ApiOperation(value = "get users in group")
    @RequestMapping(value = "/{id}/users", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<UserGetCommand> getGroupsUsers(@PathVariable(value = "id") String id) {
        return userGroupService.getGroupsUsers(id);
    }

}
