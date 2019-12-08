package it.docSys.DTO.statusDTO;

import it.docSys.enums.States;

import java.time.LocalDate;

public class ApproveDTO {

    private LocalDate approvingDate;

    private States state;

    public ApproveDTO(LocalDate approvingDate, States state) {
        this.approvingDate = approvingDate;
        this.state = state;
    }

    public LocalDate getApprovingDate() {
        return approvingDate;
    }

    public void setApprovingDate(LocalDate approvingDate) {
        this.approvingDate = approvingDate;
    }

    public States getState() {
        return state;
    }

    public void setState(States state) {
        this.state = state;
    }
}
