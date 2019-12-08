package it.akademija.wizards.models.stats;

public class StatsGetTypeCommand {

    private String documentTypeTitle;
    private Long submittedCount;
    private Long approvedCount;
    private Long rejectedCount;

    public StatsGetTypeCommand(String documentTypeTitle, Long submittedCount, Long approvedCount, Long rejectedCount) {
        this.documentTypeTitle = documentTypeTitle;
        this.submittedCount = submittedCount;
        this.approvedCount = approvedCount;
        this.rejectedCount = rejectedCount;
    }

    public String getDocumentTypeTitle() {
        return documentTypeTitle;
    }

    public void setDocumentTypeTitle(String documentTypeTitle) {
        this.documentTypeTitle = documentTypeTitle;
    }

    public Long getSubmittedCount() {
        return submittedCount;
    }

    public void setSubmittedCount(Long submittedCount) {
        this.submittedCount = submittedCount;
    }

    public Long getApprovedCount() {
        return approvedCount;
    }

    public void setApprovedCount(Long approvedCount) {
        this.approvedCount = approvedCount;
    }

    public Long getRejectedCount() {
        return rejectedCount;
    }

    public void setRejectedCount(Long rejectedCount) {
        this.rejectedCount = rejectedCount;
    }
}
