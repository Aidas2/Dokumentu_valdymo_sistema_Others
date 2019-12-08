package it.docSys.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.docSys.DTO.statusDTO.*;
import it.docSys.services.StatusService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value = "Document Status Controller")
@RequestMapping(value = "/api/documents/Status")
public class StatusController {


    @Autowired
    private StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    private static Logger logger = LoggerFactory.getLogger(DocumentController.class);


    @GetMapping
    @ApiOperation(value = "Get all statuses", notes = "Returns all documents statuses")
    public List<OnlyStatusDTO> getAllDocuments() {
        logger.info("List of all documents");
        return statusService.getAllStates();
    }


    @GetMapping(value = "/GetStatus/{id}")
    @ApiOperation(value = "Get document status by id", notes = "Returns specific document status")
    public OnlyStatusDTO getStatusById(
            @ApiParam(value = "id", required = true)
            @PathVariable final Long id) {
        logger.info("Specific document Status exists");
        return statusService.getDocumentState(id);
    }


    @PutMapping("/submitted/{id}")
    @ApiOperation(value = "Submit document")
    public void submitDocumentById(@PathVariable final Long id, @RequestBody SubmitDTO submitDTO) {
        logger.info("A document has been submitted");
        statusService.submitDocument(id, submitDTO);
    }


    @GetMapping("/getSubmitted/{id}")
    @ApiOperation(value = "Get submitted document")
    public SubmitDTO getSubmittedDocumentById(@ApiParam(value = "id", required = true) @PathVariable final Long id) {
        logger.info("Getting submitted document");
        return statusService.getSubmittedDocument(id);
    }


    @PutMapping("/approved/{id}")
    @ApiOperation(value = "Approve document")
    public void approveDocumentById(@PathVariable final Long id, @RequestBody ApproveDTO approveDTO) {
        logger.info("A document has been approved");
        statusService.approveDocument(id, approveDTO);
    }


    @GetMapping("/getApproved/{id}")
    @ApiOperation(value = "Get approved document")
    public ApproveDTO getApprovedDocumentById(@ApiParam(value = "id", required = true) @PathVariable final Long id) {
        logger.info("Getting approved document");
        return statusService.getApprovedDocument(id);
    }


    @PutMapping("/rejected/{id}")
    @ApiOperation(value = "Reject document")
    public void rejectDocumentById(@PathVariable final Long id, @RequestBody RejectDTO rejectDTO) {
        logger.info("A document has been rejected");
        statusService.rejectDocument(id, rejectDTO);
    }


    @GetMapping("/getRejected/{id}")
    @ApiOperation(value = "Get rejected document")
    public RejectDTO getRejectedDocumentById(@ApiParam(value = "id", required = true) @PathVariable final Long id) {
        logger.info("Getting rejected document");
        return statusService.getRejectedDocument(id);
    }
}
