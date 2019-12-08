package it.docSys.DTO.statusDTO;

import it.docSys.enums.States;

import java.time.LocalDate;

public class SubmitDTO {
    private LocalDate submissionDate;

    private States state;

    public SubmitDTO(LocalDate submissionDate, States state) {
        this.submissionDate = submissionDate;
        this.state = state;
    }

    public States getState() {
        return state;
    }

    public void setState(States state) {
        this.state = state;
    }

    public LocalDate getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }
}
