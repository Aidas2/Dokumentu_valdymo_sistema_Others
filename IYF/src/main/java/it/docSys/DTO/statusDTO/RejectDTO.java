package it.docSys.DTO.statusDTO;

import it.docSys.enums.States;

import java.time.LocalDate;

public class RejectDTO {


    private LocalDate rejectionDate;

    private String rejectionReason;

    private States state;

    public RejectDTO(LocalDate rejectionDate, String rejectionReason, States state) {
        this.rejectionDate = rejectionDate;
        this.rejectionReason = rejectionReason;
        this.state = state;
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
