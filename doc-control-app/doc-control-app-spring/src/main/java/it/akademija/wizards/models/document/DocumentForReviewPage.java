package it.akademija.wizards.models.document;

import java.util.List;

public class DocumentForReviewPage {

    private List<DocumentGetReviewCommand> documentList;
    private long totalElements;
    private int totalPages;

    public DocumentForReviewPage(List<DocumentGetReviewCommand> documentList, long totalElements, int totalPages) {
        this.documentList = documentList;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<DocumentGetReviewCommand> getDocumentList() {
        return documentList;
    }

    public void setDocumentList(List<DocumentGetReviewCommand> documentList) {
        this.documentList = documentList;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
