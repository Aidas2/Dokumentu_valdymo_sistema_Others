package it.akademija.wizards.models.document;

import java.util.List;

public class DocumentPageGetCommand {

    private List<DocumentGetCommand> documentList;
    private long totalElements;
    private int totalPages;

    public DocumentPageGetCommand(List<DocumentGetCommand> documentList, long totalElements, int totalPages) {
        this.documentList = documentList;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<DocumentGetCommand> getDocumentList() {
        return documentList;
    }

    public void setDocumentList(List<DocumentGetCommand> documentList) {
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
