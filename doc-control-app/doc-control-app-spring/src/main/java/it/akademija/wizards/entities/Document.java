package it.akademija.wizards.entities;

import it.akademija.wizards.enums.DocumentState;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "document", indexes = {
        @Index(name = "idx_doc_title", columnList = "title"),
        @Index(name = "idx_doc_description", columnList = "description"),
        @Index(name = "idx_doc_author", columnList = "author_id"),
        @Index(name = "idx_doc_type", columnList = "doctype_id"),
        @Index(name = "idx_doc_credate", columnList = "creation_date"),
        @Index(name = "idx_doc_subdate", columnList = "submission_date"),
        @Index(name = "idx_doc_state", columnList = "document_state")
})
public class Document {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @NotNull
    @Column(unique = true)
    private String prefix;

//    Other files prefixes
    @ElementCollection
    @CollectionTable
    @Column
    private List<String> additionalFilePaths = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @NotNull
    @Column(name = "document_state", nullable = false)
    private DocumentState documentState;

    @ManyToOne
    @JoinColumn(name = "doctype_id", nullable = false)
    private DocumentType documentType;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "description")
    private String description;

    @Column(name = "creation_date")
    private Date creationDate;

    @Column(name = "submission_date")
    private Date submissionDate;

    private Date approvalDate;

    private Date rejectionDate;

    @ManyToOne
    private User reviewer;

    private String rejectionReason;

    private String path;

    //CONSTRUCTORS
    public Document() {
    }

    public Document(User author,
                    DocumentState documentState,
                    DocumentType documentType,
                    @NotNull String title,
                    @NotNull String description,
                    Date creationDate,
                    Date submissionDate,
                    Date approvalDate,
                    Date rejectionDate,
                    User reviewer,
                    String rejectionReason,
                    String path) {
        this.author = author;
        this.documentState = documentState;
        this.documentType = documentType;
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

    //GETTERS SETTERS
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix() {
      this.prefix = "_" + author.getUsername() + "_" + System.currentTimeMillis();
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public DocumentState getDocumentState() {
        return documentState;
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

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
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

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public void setReviewDate() {
        if (this.documentState.equals(DocumentState.ACCEPTED)) this.approvalDate = new Date();
        else if (this.documentState.equals(DocumentState.REJECTED)) {
            this.rejectionDate = new Date();
        }
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public List<String> getAdditionalFilePaths() {
        return additionalFilePaths;
    }

    public void setAdditionalFilePaths(List<String> additionalFilePaths) {
        this.additionalFilePaths = additionalFilePaths;
    }
}
