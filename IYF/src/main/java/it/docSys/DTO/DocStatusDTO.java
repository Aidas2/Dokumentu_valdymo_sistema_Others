package it.docSys.DTO;

import it.docSys.enums.States;

import java.time.LocalDate;

public class DocStatusDTO {

      private LocalDate submissionDate;

      private LocalDate approvingDate;

      private LocalDate rejectionDate;

      private String rejectionReason;

      private States state;

    public DocStatusDTO(LocalDate submissionDate,
                        LocalDate approvingDate, LocalDate rejectionDate,
                        String rejectionReason, States state) {
        this.submissionDate = submissionDate;
        this.approvingDate = approvingDate;
        this.rejectionDate = rejectionDate;
        this.rejectionReason = rejectionReason;
        this.state = state;
    }

    public LocalDate getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }

    public LocalDate getApprovingDate() {
        return approvingDate;
    }

    public void setApprovingDate(LocalDate approvingDate) {
        this.approvingDate = approvingDate;
    }

    public LocalDate getRejectionDate() {
        return rejectionDate;
    }

    public void setRejectionDate(LocalDate rejectionDate) {
        this.rejectionDate = rejectionDate;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public States getState() {
        return state;
    }

    public void setState(States state) {
        this.state = state;
    }
}
