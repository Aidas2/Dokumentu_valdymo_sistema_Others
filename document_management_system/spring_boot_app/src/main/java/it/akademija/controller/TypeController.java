package it.akademija.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.TypeDTO;
import it.akademija.entity.Type;
import it.akademija.entity.TypeGroup;
import it.akademija.payload.IncomingRequestBody;
import it.akademija.service.TypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@Api(value="type")
@RequestMapping(value = "/api/types")
public class TypeController {


    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value="Get list of types", notes="Returns list of types")
    public List<TypeDTO> getTypes() {

        return typeService.getTypes();
    }

    @RequestMapping(path = "/typeGroup", method = RequestMethod.GET)
    @ApiOperation(value="Get list of types", notes="Returns list of types mapped to groups")
    public List<TypeGroup> getTypesByGroup() {

        return typeService.getGroupTypes();
    }

    @RequestMapping(path = "/{email}/userDocumentTypes", method = RequestMethod.GET)
    @ApiOperation(value="Get list of user documents types", notes="Returns list of document types mapped to user")
    public List<Type> getSenderTypesByUser(@PathVariable final String email) {

        return typeService.getUserSenderGroupTypes(email);
    }

    @RequestMapping(path = "/{email}/userReceivedDocumentTypes", method = RequestMethod.GET)
    @ApiOperation(value="Get list of user documents types", notes="Returns list of document types mapped to user")
    public List<Type> getReceiverTypesByUser(@PathVariable final String email) {

        return typeService.getUserReceiverGroupTypes(email);
    }

    @RequestMapping(path = "/{title}", method = RequestMethod.GET)
    @ApiOperation(value="Get type ", notes="Returns type")
    public TypeDTO getType(@PathVariable final String title){
         return typeService.getTypeByTitle(title);
    }

    @RequestMapping(path = "/groups/{title}", method = RequestMethod.GET)
    @ApiOperation(value="Get type ", notes="Returns type")
    public TypeDTO getTypeGroups(@PathVariable final String title){
        return typeService.getTypeGroups(title);
    }

    @RequestMapping(path="/new", method = RequestMethod.POST)
    @ApiOperation(value="Create type", notes = "Creates new type of the document")
    @ResponseStatus(HttpStatus.CREATED)
    public void createType(
            @ApiParam(value="Type data", required=true)
            @RequestBody final IncomingRequestBody requestBody){

        log.info("The type {} was created", requestBody);
        typeService.createType(requestBody);
    }


    @RequestMapping(path = "/{title}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value="Type data", notes="Deletes type by title")
    public void deleteType(
            @ApiParam(value="Type data", required=true)
            @PathVariable final String title) {
        log.info("The type {} deleted", title);
        typeService.deleteType(title);
    }


    @RequestMapping(path = "/{title}/edit", method = RequestMethod.PUT)
    @ApiOperation(value = "Get and update type", notes = "Returns type by title and updates type information")
    @ResponseStatus(HttpStatus.OK)
    public void updateType(
            @ApiParam(value = "Type data", required = true)
            @RequestBody IncomingRequestBody requestBody,
            @PathVariable final String title){
        log.info(" Type {} is updated", title);
        typeService.editType(requestBody, title);
    }

    @RequestMapping(path="/{title}/addGroup", method = RequestMethod.POST)
    @ApiOperation(value="Add user group", notes = "Adds user group to document type")
    @ResponseStatus(HttpStatus.CREATED)
    public void addUserGroup(
            @ApiParam(value="Type data", required=true)
            @PathVariable final String title,
            @RequestBody final IncomingRequestBody requestBody){

        typeService.addUserGroup(title, requestBody);
    }

    @RequestMapping(path = "/{title}/{groupName}/remove", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value="Remove group", notes="Remove group form type groups list")
    public void removeUserGroup(
            @PathVariable final String title,
            @PathVariable final String groupName){
        log.info("Type {} of group {} deleted", title, groupName);
        typeService.removeUserGroup(title, groupName);
    }

}
