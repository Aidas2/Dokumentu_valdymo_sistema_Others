package it.akademija.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.GroupDTO;
import it.akademija.payload.RequestGroup;
import it.akademija.service.GroupService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@Api(value="group")
@RequestMapping(value = "/api/group")
public class GroupController {

    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value="Get list of groups", notes="Returns list of groups created")
    public List<GroupDTO> getGroups() {
        //log.info("List of group");
        return groupService.getGroups();
    }

    @RequestMapping(path = "/{name}", method = RequestMethod.GET)
    @ApiOperation(value="Get group ", notes="Returns group by name")
    public GroupDTO getGroup(@PathVariable final String name){
        //log.info("This group: "+ name+" has been returned");
        return groupService.getGroupByName(name);
    }

    @RequestMapping(path="/new", method = RequestMethod.POST)
    @ApiOperation(value="Create group", notes = "Creates new group")
    @ResponseStatus(HttpStatus.CREATED)
    public void createGroup(
            @ApiParam(value="Group data", required=true)
            @RequestBody final RequestGroup requestBody){
        log.info("The group {} created", requestBody);

        groupService.createGroup(requestBody);
    }


    @RequestMapping(path = "/{name}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="Data type", notes="Deletes group by name")
    public void deleteGroup(
            @ApiParam(value="Group data", required=true)
            @PathVariable final String name)
    {
       log.info("The group: "+ name+" has been deleted");
        groupService.deleteGroup(name);
    }

    @RequestMapping(path = "/{name}/edit", method = RequestMethod.PUT)
    @ApiOperation(value = "Get and update group", notes = "Returns group by name and updates group information")
    @ResponseStatus(HttpStatus.OK)
    public void updateGroup(
            @ApiParam(value = "Group data", required = true)
            @RequestBody RequestGroup request,
            @PathVariable final String name){
       log.info("The group: "+ name+ "has been updated");
        groupService.editGroup(request, name);
    }

}
