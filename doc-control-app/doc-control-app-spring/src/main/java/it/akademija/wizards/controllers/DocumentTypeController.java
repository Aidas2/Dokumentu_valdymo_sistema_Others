package it.akademija.wizards.controllers;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.wizards.models.documenttype.DocumentTypeCreateCommand;
import it.akademija.wizards.models.documenttype.DocumentTypeGetCommand;
import it.akademija.wizards.models.user.UserAddGroupsCommand;
import it.akademija.wizards.models.user.UserRemoveGroupsCommand;
import it.akademija.wizards.models.usergroup.UserGroupGetCommand;
import it.akademija.wizards.services.DocumentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value = "document types")
@RequestMapping(value = "/api/doctypes")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class DocumentTypeController {
    @Autowired
    private DocumentTypeService documentTypeService;

    @ApiOperation(value = "get all document types")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<DocumentTypeGetCommand> getDocumentTypes(){
        return documentTypeService.getDocumentTypes();
    }

    @ApiOperation(value = "get document type by id")
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public DocumentTypeGetCommand getDocumentTypeById(
            @PathVariable String id){
        return documentTypeService.getDocumentTypeById(id);
    }

    @ApiOperation(value = "create a document type")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createDocumentType(
            @RequestBody DocumentTypeCreateCommand documentTypeCreateCommand){
        documentTypeService.createDocumentType(documentTypeCreateCommand);
    }

    @ApiOperation(value = "update a document type")
    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.CREATED)
    public void updateDocumentType(
            @PathVariable String id,
            @RequestBody DocumentTypeCreateCommand documentTypeCreateCommand){
        documentTypeService.updateDocumentType(id, documentTypeCreateCommand);
    }

    @ApiOperation(value = "delete a document type")
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.CREATED)
    public void deleteDocumentType(
            @PathVariable String id){
        documentTypeService.deleteDocumentType(id);
    }

    @ApiOperation(value = "add groups to doc type")
    @RequestMapping(value="/{id}/groups/{groupType}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addGroupsToDocType(
            @ApiParam(value="Document type id")
            @PathVariable String id,
            @ApiParam(value="submission/review")
            @PathVariable String groupType,
            @RequestBody UserAddGroupsCommand userAddGroupsCommand) {
        documentTypeService.addGroupsToDocType(id, groupType,userAddGroupsCommand);
    }

    @ApiOperation(value = "remove groups from doc type")
    @RequestMapping(value="/{id}/groups/{groupType}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.CREATED)
    public void removeGroupsFromDocType(
            @ApiParam(value="Document type id")
            @PathVariable String id,
            @ApiParam(value="submission/review")
            @PathVariable String groupType,
            @RequestBody UserRemoveGroupsCommand userRemoveGroupsCommand) {
        documentTypeService.removeGroupsFromDocType(id, groupType, userRemoveGroupsCommand);
    }

    @ApiOperation(value = "get groups from doc type")
    @RequestMapping(value="/{id}/groups/{groupType}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.CREATED)
    public List<UserGroupGetCommand> getDocTypeGroups(
            @ApiParam(value="Document type id")
            @PathVariable String id,
            @ApiParam(value="submission/review")
            @PathVariable String groupType){
        return documentTypeService.getDocTypeGroups(id, groupType);
    }



}
