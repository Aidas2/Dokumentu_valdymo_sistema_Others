package it.docSys.DTO;

import java.io.Serializable;
import java.time.LocalDate;

public class GetRejectedDocumentDTO implements Serializable {

    private Long id;
    private String author;
    private String type;
    private String name;
    private String description;
    private LocalDate submissionDate;
    private LocalDate rejectionDate;
    private String addressee;
    private String rejectionReason;
    private byte attachments;



    public GetRejectedDocumentDTO(Long id, String author, String type, String name, String description,
                                  LocalDate submissionDate, LocalDate rejectionDate,
                                  String rejectionReason, String addressee, byte attachments) {
        this.id = id;
        this.author = author;
        this.type = type;
        this.name = name;
        this.description = description;
        this.submissionDate = submissionDate;
        this.rejectionDate = rejectionDate;
        this.addressee = addressee;
        this.rejectionReason = rejectionReason;
        this.attachments = attachments;
    }

    public GetRejectedDocumentDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }


    public LocalDate getRejectionDate() {
        return rejectionDate;
    }

    public void setRejectionDate(LocalDate rejectionDate) {
        this.rejectionDate = rejectionDate;
    }

    public String getAddressee() {
        return addressee;
    }

    public void setAddressee(String addressee) {
        this.addressee = addressee;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public byte getAttachments() {
        return attachments;
    }

    public void setAttachments(byte attachments) {
        this.attachments = attachments;
    }
}
