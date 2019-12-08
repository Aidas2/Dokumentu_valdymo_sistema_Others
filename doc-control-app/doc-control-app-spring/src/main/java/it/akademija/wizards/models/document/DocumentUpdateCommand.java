package it.akademija.wizards.models.document;

;

public class DocumentUpdateCommand {

    private String title;
    private String documentTypeTitle;
    private String description;
    private String mainFilePathToDelete;
    private String [] additionalFilePathsToDelete;

    public DocumentUpdateCommand() {
    }

    public DocumentUpdateCommand(String title,
                                 String documentTypeTitle,
                                 String description,
                                 String mainFilePathToDelete,
                                 String[] additionalFilePathsToDelete) {
        this.title = title;
        this.documentTypeTitle = documentTypeTitle;
        this.description = description;
        this.mainFilePathToDelete = mainFilePathToDelete;
        this.additionalFilePathsToDelete = additionalFilePathsToDelete;
    }

    public String getDocumentTypeTitle() {
        return documentTypeTitle;
    }

    public void setDocumentTypeTitle(String documentTypeTitle) {
        this.documentTypeTitle = documentTypeTitle;
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

    public String getMainFilePathToDelete() {
        return mainFilePathToDelete;
    }

    public void setMainFilePathToDelete(String mainFilePathToDelete) {
        this.mainFilePathToDelete = mainFilePathToDelete;
    }

    public String[] getAdditionalFilePathsToDelete() {
        return additionalFilePathsToDelete;
    }

    public void setAdditionalFilePathsToDelete(String[] additionalFilePathsToDelete) {
        this.additionalFilePathsToDelete = additionalFilePathsToDelete;
    }
}
