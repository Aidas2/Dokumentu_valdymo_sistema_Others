package it.akademija.controller;

import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.common.base.Joiner;
import it.akademija.dto.UserDTO;
import it.akademija.entity.Document;
import it.akademija.entity.User;
import it.akademija.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.google.common.base.Joiner;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.dto.DocumentDTO;
import it.akademija.entity.Document;
import it.akademija.payload.RequestDocument;
import it.akademija.payload.RequestMessage;
import it.akademija.repository.DocumentRepository;
import it.akademija.service.DocumentService;
import it.akademija.service.DocumentSpecificationsBuilder;
import it.akademija.service.SearchOperation;
import it.akademija.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/api/documents")
public class DocumentController {

    private final DocumentService documentService;
    private final UserService userService;
    private ApplicationEventPublisher eventPublisher;
    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentController(DocumentService documentService, UserService userService, ApplicationEventPublisher eventPublisher, DocumentRepository documentRepository) {
        this.documentService = documentService;
        this.userService = userService;
        this.eventPublisher = eventPublisher;

        this.documentRepository = documentRepository;
}


    @GetMapping("/submitted/{email}/{startDate}/{endDate}/{title}/{name}")
    public int getUserSubmittedDocumentCountByTypeGroupDateRange(@PathVariable final String email,
                                                                @PathVariable final Date startDate, @PathVariable final Date endDate,
                                                                @PathVariable final String title, @PathVariable final String name) {
        return documentService.returnUserSubmittedDocumentCountByTypeGroupDateRange(email, startDate, endDate, title, name);
    }

    @GetMapping("/confirmed/{email}/{startDate}/{endDate}/{title}/{name}")
    public int getUserConfirmedDocumentCountByTypeGroupDateRange(@PathVariable final String email,
                                                                @PathVariable final Date startDate, @PathVariable final Date endDate,
                                                                @PathVariable final String title, @PathVariable final String name) {
        return documentService.returnUserConfirmedDocumentCountByTypeGroupDateRange(email, startDate, endDate, title, name);
    }

    @GetMapping("/rejected/{email}/{startDate}/{endDate}/{title}/{name}")
    public int getUserRejectedDocumentCountByTypeGroupDateRange(@PathVariable final String email,
                                                                 @PathVariable final Date startDate, @PathVariable final Date endDate,
                                                                 @PathVariable final String title, @PathVariable final String name) {
        return documentService.returnUserRejectedDocumentCountByTypeGroupDateRange(email, startDate, endDate, title, name);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/find/specs")
    @ResponseBody
    public List<Document> findAllBySpecification(@RequestParam(value = "search") String search) {
        DocumentSpecificationsBuilder builder = new DocumentSpecificationsBuilder();
        String operationSetExper = Joiner.on("|")
                .join(SearchOperation.SIMPLE_OPERATION_SET);
        Pattern pattern = Pattern.compile("(\\w+?)(" + operationSetExper + ")(\\p{Punct}?)(\\w+?)(\\p{Punct}?),");
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(4), matcher.group(3), matcher.group(5));
        }

        Specification<Document> spec = builder.build();

        log.info("GET {} {}", ServletUriComponentsBuilder.fromCurrentRequest().build().toUri(), search);


        return documentRepository.findAll(spec);
    }


    @RequestMapping(
            value = "/findByNumberOrStatus",
            method = RequestMethod.GET)
    public Page<DocumentDTO> getDocumentsByNumberOrStatus(DocumentListRequest request, Pageable pageable) {
        return documentService.findDocumentsByNumberOrStatus(request, pageable);
    }

    @GetMapping("/{startDate}/{endDate}")
    public Page<DocumentDTO> getDocumentsInDateRange(@PathVariable final Date startDate, @PathVariable final Date endDate, Pageable pageable) {
        return documentService.findByDateRange(startDate, endDate, pageable);
    }


    @GetMapping("{email}/{startDate}/{endDate}")
    public Page<DocumentDTO> getDUserocumentsInDateRange(@PathVariable final String email, @PathVariable final Date startDate, @PathVariable final Date endDate, Pageable pageable) {
        return documentService.findUserDocumentByDateRange(email, startDate, endDate, pageable);
    }

    @GetMapping("/{email}/{title}/all")
    public Page<DocumentDTO> allDocumentsByTitlePaged(@PathVariable final String email, @PathVariable final String title, Pageable pageable) {
        return documentService.findUserDocumentBytTitle(email, title, pageable);
    }


    @GetMapping("/received/{email}/{startDate}/{endDate}")
    public Page<DocumentDTO> getUserReceivedDocumentsInDateRange(@PathVariable final String email, @PathVariable final Date startDate, @PathVariable final Date endDate, Pageable pageable) {
        return documentService.findUserReceivedDocumentByDateRange(email, startDate, endDate, pageable);
    }

    @GetMapping("/received/{email}/{title}")
    public Page<DocumentDTO> getUserReceivedDocumentsByTitlePaged(@PathVariable final String email, @PathVariable final String title, Pageable pageable) {
        return documentService.findUserReceivedDocumentsBytTitle(email, title, pageable);
    }

    @GetMapping("/{title}/all")
    public Page<DocumentDTO> allDocumentsByTypePaged(@PathVariable final String title, Pageable pageable) {
        return documentService.pagedAllUserDocuments(title, pageable);
    }

    @GetMapping("/test")
    public Page<DocumentDTO> pathParamDocuments(Pageable pageable) {
        log.info("returning documentService.listByPage");
        return documentService.listByPage(pageable);
    }

    @GetMapping("/count")
    public Long documentCount() {
        return documentService.returnCount();
    }

    @GetMapping("/{email}/allCreated")
    public Page<DocumentDTO> userAllDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedAllUserDocuments(email, pageable);
    }

    @GetMapping("/{email}/submitted")
    public Page<DocumentDTO> userSubmittedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserSubmittedDocuments(email, pageable);
    }

    @GetMapping("/{email}/confirmed")
    public Page<DocumentDTO> userConfirmedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserConfirmedDocuments(email, pageable);
    }

    @GetMapping("/{email}/notSubmitted")
    public Page<DocumentDTO> userNotSubmittedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserNotSubmittedDocuments(email, pageable);
    }

    @GetMapping("/{email}/rejected")
    public Page<DocumentDTO> userRejectedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserRejectedDocuments(email, pageable);
    }

    @GetMapping("/{email}/received")
    public Page<DocumentDTO> userReceivedDocumentsPaged(@PathVariable final String email, Pageable pageable) {
        return documentService.pagedUserReceivedDocuments(email, pageable);
    }

    @GetMapping("/documentsSpecCount/{title}")
    public int getDocumentByTypeStatusCount(@PathVariable final String title){
        return documentRepository.findCountByDocumentTitleAndStatus(title);
    }

    @GetMapping("/{email}/submittedCount")
    public int userSubmittedDocumentCount(@PathVariable final String email) {
        return documentService.returnSubmittedlUserDocumentCount(email);
    }

    @GetMapping("/{email}/confirmedCount")
    public int userConfirmedDocumentCount(@PathVariable final String email) {
        return documentService.returnConfirmedUserDocumentCount(email);
    }

    @GetMapping("/{email}/rejectedCount")
    public int userRejectedDocumentCount(@PathVariable final String email) {
        return documentRepository.getUserRejectedDocumentCount(email);
    }

    @RequestMapping(path="/new", method = RequestMethod.POST)
    @ApiOperation(value = "Create document", notes = "Creates document with received data from the form")
    @ResponseStatus(HttpStatus.CREATED)
    void createDocument(@ApiParam(value = "Document data", required = true)
                           @RequestBody final RequestDocument requestDocument) {
        documentService.createDocument(requestDocument);
    }

    @RequestMapping(path="/{email}/documents", method = RequestMethod.GET)
    @ApiOperation(value = "Get all user documents", notes = "Returns list of all documents associated with user")
    List<DocumentDTO> getAllUserDocuments( @PathVariable final String email) {
        log.info("User documents filtered using email {}", email);
        return documentService.getAllUserDocuments(email);
    }

    @RequestMapping(path="/{email}/received/documents", method = RequestMethod.GET)
    @ApiOperation(value = "Get all user documents", notes = "Returns list of all documents associated with user")
    List<DocumentDTO> getAllUserReceivedDocuments( @PathVariable final String email) {
        log.info("Returns all received documents filtered using email: {}", email);
        return documentService.getAllUserReceivedDocuments(email);
    }

    @RequestMapping(path="/{uniqueNumber}/file", method = RequestMethod.POST)
    @ApiOperation(value = "Add file", notes = "Add additional attachements to created document")
    void addAdditionalFiles(
            @PathVariable final String uniqueNumber,
            @RequestBody RequestDocument request) {
        documentService.additionalFile(uniqueNumber, request);
    }


    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value = "Get all documents", notes = "Returns list of all documents in database")
    List<DocumentDTO> getAllDocuments() {
        //log.info("Returns list of all documents in database");
        return documentService.getAll();
    }


    @RequestMapping(path = "/{uniqueNumber}", method = RequestMethod.GET)
    @ApiOperation(value = "Get one document", notes = "Returns one document by number")
    public DocumentDTO getDocument(
            @PathVariable final String uniqueNumber) {
        log.info ("The document No: " + uniqueNumber+ " has been returned");
        return documentService.getDocumentByTitle(uniqueNumber);
    }

    @RequestMapping(path = "/{uniqueNumber}/edit", method = RequestMethod.PUT)
    @ApiOperation(value = "Get and update document", notes = "Returns document by document number and updates")
    @ResponseStatus(HttpStatus.OK)
    public void updateDocument(
            @ApiParam(value = "Document data", required = true)
            @RequestBody RequestDocument request,
            @PathVariable final String uniqueNumber){
        documentService.updateDocument(request, uniqueNumber);
        log.info("The document No: " + uniqueNumber + "has been updated");
    }

    @RequestMapping(path = "/{uniqueNumber}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete document", notes = "Deletes document by number")
    void deleteDocument(@PathVariable final String uniqueNumber) {
        documentService.deleteDocument(uniqueNumber);
        log.info("The document No: " +  uniqueNumber+ "has been deleted");

    }

    @RequestMapping(path = "/{uniqueNumber}/{email}/submit", method = RequestMethod.PUT)
    @ApiOperation(value = "Submit document", notes = "Submit document, change status")
    @ResponseStatus(HttpStatus.OK)
    void submitDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @PathVariable final String email)
    {
        log.info("The document No: "+ uniqueNumber+ "has been submitted");
        documentService.submitDocument(uniqueNumber, email);
    }

    @RequestMapping(path = "/{uniqueNumber}/{email}/confirm", method = RequestMethod.PUT)
    @ApiOperation(value = "Confirm document", notes = "Confirm document, change status")
    @ResponseStatus(HttpStatus.OK)
    void confirmDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @PathVariable final String email)
    {
        log.info("The document No: "+ uniqueNumber+ "has been confirmed");
        documentService.confirmDocument(uniqueNumber, email);
    }

    @RequestMapping(path = "/{uniqueNumber}/{email}/reject", method = RequestMethod.PUT)
    @ApiOperation(value = "Reject document", notes = "Reject document, change status")
    @ResponseStatus(HttpStatus.OK)
    void rejectDocument(
            @ApiParam(value = "Document data", required = true)
            @PathVariable final String uniqueNumber,
            @PathVariable final String email,
            @RequestBody RequestMessage request)
    {
        log.info("The document No: "+ uniqueNumber+ "has been rejected");
        documentService.rejectDocument(uniqueNumber, email, request);
    }

}