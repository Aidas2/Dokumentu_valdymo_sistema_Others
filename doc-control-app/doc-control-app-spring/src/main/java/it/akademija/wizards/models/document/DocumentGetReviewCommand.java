package it.akademija.wizards.models.document;

import java.util.Date;

public class DocumentGetReviewCommand {
    private String authorFirstname;
    private String authorLastname;
    private String id;
    private String title;
    private String description;
    private String documentTypeTitle;
    private Date submissionDate;

    public DocumentGetReviewCommand(String authorFirstname, String authorLastname, String id, String title, String description, String documentTypeTitle, Date submissionDate) {
        this.authorFirstname = authorFirstname;
        this.authorLastname = authorLastname;
        this.id = id;
        this.title = title;
        this.description = description;
        this.documentTypeTitle = documentTypeTitle;
        this.submissionDate = submissionDate;
    }

    public String getAuthorFirstname() {
        return authorFirstname;
    }

    public void setAuthorFirstname(String authorFirstname) {
        this.authorFirstname = authorFirstname;
    }

    public String getAuthorLastname() {
        return authorLastname;
    }

    public void setAuthorLastname(String authorLastname) {
        this.authorLastname = authorLastname;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getDocumentTypeTitle() {
        return documentTypeTitle;
    }

    public void setDocumentTypeTitle(String documentTypeTitle) {
        this.documentTypeTitle = documentTypeTitle;
    }

    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }
}
