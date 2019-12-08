package it.akademija.wizards.models.document;

import it.akademija.wizards.enums.DocumentState;

public class DocumentReviewCommand {

    private String rejectionReason;
    private DocumentState documentState;

    public DocumentReviewCommand() {

    }

    public DocumentReviewCommand(String rejectionReason, String documentState) {
        this.rejectionReason = rejectionReason;
        this.documentState = DocumentState.valueOf(documentState);
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public DocumentState getDocumentState() {
        return documentState;
    }

    public void setDocumentState(String documentState) {
        this.documentState = DocumentState.valueOf(documentState);
    }
}
