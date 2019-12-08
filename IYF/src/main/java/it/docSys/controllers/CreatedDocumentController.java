package it.docSys.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.docSys.DTO.GetCreatedDocumentDTO;
import it.docSys.DTO.PutCreatedDocumentDTO;
import it.docSys.services.CreatedDocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;


@RestController
@ApiIgnore
@Api(value = "CreatedDocument Controller")
@RequestMapping(value = "/api/createdDocuments")
public class CreatedDocumentController {

    @Autowired
    private CreatedDocumentService createdDocumentService;

    public CreatedDocumentController(CreatedDocumentService createdDocumentService) {
        this.createdDocumentService = createdDocumentService;
    }


    private static Logger logger = LoggerFactory.getLogger(CreatedDocumentController.class);


    @PostMapping
    @ApiOperation(value = "Save new createdDocument", notes = "Adds new createdDocument and saves to database")
    public void save(@RequestBody final PutCreatedDocumentDTO putCreatedDocumentDTO){
        logger.info("A createdDocument has been added");
        createdDocumentService.create(putCreatedDocumentDTO);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Update existing createdDocument")
    public void update(@PathVariable final Long id, @RequestBody PutCreatedDocumentDTO putCreatedDocumentDTO){
        logger.info("A createdDocument has been updated");
        createdDocumentService.update(id, putCreatedDocumentDTO);
    }


    @GetMapping(value = "/{id}")
    @ApiOperation(value = "Get createdDocument by id", notes = "Returns specific createdDocument by id")
    public GetCreatedDocumentDTO getById(
            @ApiParam(value = "id", required = true)
            @PathVariable final Long id) {
        logger.info("Specific createdDocument has been found");
        return createdDocumentService.get(id);
    }


    @GetMapping
    @ApiOperation(value = "Get all createdDocuments", notes = "Returns all createdDocuments from database")
    public List<GetCreatedDocumentDTO> getAllDocuments(){
        logger.info("List of all createdDocuments");
        return createdDocumentService.listAll();
    }


    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete createdDocument by id")
    public void delete(@ApiParam(value = "id", required = true) @PathVariable final Long id){
        logger.info("A createdDocument has been deleted");
        createdDocumentService.delete(id);
    }
}
