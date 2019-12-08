package it.akademija.wizards.models.document;

import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.user.UserGetCommand;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DocumentGetCommand {

    private String id;
    private String prefix;
    private UserGetCommand author;
    private DocumentState documentState;
    private String documentTypeTitle;
    private String title;
    private String description;
    private Date creationDate;
    private Date submissionDate;
    private Date approvalDate;
    private Date rejectionDate;
    private UserGetCommand reviewer;
    private String rejectionReason;
    private String path;
    private List<String> additionalFilePaths = new ArrayList<>();
    public DocumentGetCommand() {

    }

    public DocumentGetCommand(UserGetCommand author, DocumentState documentState, String documentTypeTitle, String title, String description, Date creationDate, Date submissionDate, Date approvalDate, Date rejectionDate, UserGetCommand reviewer, String rejectionReason, String path) {
        this.author = author;
        this.documentState = documentState;
        this.documentTypeTitle = documentTypeTitle;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.submissionDate = submissionDate;
        this.approvalDate = approvalDate;
        this.rejectionDate = rejectionDate;
        this.reviewer = reviewer;
        this.rejectionReason = rejectionReason;
        this.path = path;
    }

    public UserGetCommand getAuthor() {
        return author;
    }

    public void setAuthor(UserGetCommand author) {
        this.author = author;
    }

    public UserGetCommand getReviewer() {
        return reviewer;
    }

    public void setReviewer(UserGetCommand reviewer) {
        this.reviewer = reviewer;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }


    public DocumentState getDocumentState() {
        return documentState;
    }

    public String getDocumentTypeTitle() {
        return documentTypeTitle;
    }

    public void setDocumentTypeTitle(String documentTypeTitle) {
        this.documentTypeTitle = documentTypeTitle;
    }


    public void setDocumentState(DocumentState documentState) {
        this.documentState = documentState;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public Date getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(Date approvalDate) {
        this.approvalDate = approvalDate;
    }

    public Date getRejectionDate() {
        return rejectionDate;
    }

    public void setRejectionDate(Date rejectionDate) {
        this.rejectionDate = rejectionDate;
    }


    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<String> getAdditionalFilePaths() {
        return additionalFilePaths;
    }

    public void setAdditionalFilePaths(List<String> additionalFilePaths) {
        this.additionalFilePaths = additionalFilePaths;
    }
}
