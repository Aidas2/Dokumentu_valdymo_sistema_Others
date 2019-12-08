package it.docSys.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.docSys.DTO.GetCreatedDocumentDTO;
import it.docSys.DTO.GetSubmittedDocumentDTO;
import it.docSys.DTO.PutCreatedDocumentDTO;
import it.docSys.DTO.PutSubmittedDocumentDTO;
import it.docSys.services.CreatedDocumentService;
import it.docSys.services.SubmittedDocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@ApiIgnore
@Api(value = "Submitted Document Controller")
@RequestMapping(value = "/api/submittedDocuments")
public class SubmittedDocumentController {

    @Autowired
    private SubmittedDocumentService submittedDocumentService;

    public SubmittedDocumentController(SubmittedDocumentService submittedDocumentService) {
        this.submittedDocumentService = submittedDocumentService;
    }


    private static Logger logger = LoggerFactory.getLogger(SubmittedDocumentController.class);


    @PostMapping
    @ApiOperation(value = "Save new submittedDocument", notes = "Adds new submittedDocument and saves to database")
    public void save(@RequestBody final PutSubmittedDocumentDTO putSubmittedDocumentDTO){
        logger.info("A submittedDocument has been added");
        submittedDocumentService.create(putSubmittedDocumentDTO);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Update existing submittedDocument")
    public void update(@PathVariable final Long id, @RequestBody PutSubmittedDocumentDTO putSubmittedDocumentDTO){
        logger.info("A submittedDocument has been updated");
        submittedDocumentService.update(id, putSubmittedDocumentDTO);
    }


    @GetMapping(value = "/{id}")
    @ApiOperation(value = "Get submittedDocument by id", notes = "Returns specific submittedDocument by id")
    public GetSubmittedDocumentDTO getById(
            @ApiParam(value = "id", required = true)
            @PathVariable final Long id) {
        logger.info("Specific submittedDocument has been found");
        return submittedDocumentService.get(id);
    }


    @GetMapping
    @ApiOperation(value = "Get all submittedDocuments", notes = "Returns all submittedDocuments from database")
    public List<GetSubmittedDocumentDTO> getAllSubmittedDocuments(){
        logger.info("List of all submittedDocuments");
        return submittedDocumentService.listAll();
    }


    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete submittedDocument by id")
    public void delete(@ApiParam(value = "id", required = true) @PathVariable final Long id){
        logger.info("A submittedDocument has been deleted");
        submittedDocumentService.delete(id);
    }
}
