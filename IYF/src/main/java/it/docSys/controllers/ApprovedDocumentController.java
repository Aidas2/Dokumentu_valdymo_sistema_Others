package it.docSys.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.docSys.DTO.*;
import it.docSys.services.ApprovedDocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@ApiIgnore
@Api(value = "Approved Document Controller")
@RequestMapping(value = "/api/approvedDocuments")
public class ApprovedDocumentController {

    @Autowired
    private ApprovedDocumentService approvedDocumentService;

    public ApprovedDocumentController(ApprovedDocumentService approvedDocumentService) {
        this.approvedDocumentService = approvedDocumentService;
    }


    private static Logger logger = LoggerFactory.getLogger(ApprovedDocumentController.class);


    @PostMapping
    @ApiOperation(value = "Save new approvedDocument", notes = "Adds new approvedDocument and saves to database")
    public void save(@RequestBody final PutApprovedDocumentDTO putApprovedDocumentDTO){
        logger.info("A approvedDocument has been added");
        approvedDocumentService.create(putApprovedDocumentDTO);
    }


    @PutMapping("/{id}")
    @ApiOperation(value = "Update existing approvedDocument")
    public void update(@PathVariable final Long id, @RequestBody PutApprovedDocumentDTO putApprovedDocumentDTO){
        logger.info("A approvedDocument has been updated");
        approvedDocumentService.update(id, putApprovedDocumentDTO);
    }


    @GetMapping(value = "/{id}")
    @ApiOperation(value = "Get approvedDocument by id", notes = "Returns specific approvedDocument by id")
    public GetApprovedDocumentDTO getById(
            @ApiParam(value = "id", required = true)
            @PathVariable final Long id) {
        logger.info("Specific approvedDocument has been found");
        return approvedDocumentService.get(id);
    }


    @GetMapping
    @ApiOperation(value = "Get all approvedDocuments", notes = "Returns all approvedDocuments from database")
    public List<GetApprovedDocumentDTO> getAllApprovedDocuments(){
        logger.info("List of all approvedDocuments");
        return approvedDocumentService.listAll();
    }


    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete approvedDocument by id")
    public void delete(@ApiParam(value = "id", required = true) @PathVariable final Long id){
        logger.info("A approvedDocument has been deleted");
        approvedDocumentService.delete(id);
    }
}
