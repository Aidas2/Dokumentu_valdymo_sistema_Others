package it.akademija.wizards.models.stats;

public class TypeUserStats {

    private String firstname;
    private String lastname;
    private Long submittedDocuments;

    public TypeUserStats(String firstname, String lastname, Long submittedDocuments) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.submittedDocuments = submittedDocuments;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Long getSubmittedDocuments() {
        return submittedDocuments;
    }

    public void setSubmittedDocuments(Long submittedDocuments) {
        this.submittedDocuments = submittedDocuments;
    }
}
