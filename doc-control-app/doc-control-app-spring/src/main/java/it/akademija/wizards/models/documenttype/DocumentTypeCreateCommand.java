package it.akademija.wizards.models.documenttype;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class DocumentTypeCreateCommand {

    @NotBlank(message = "document type title can not be blank")
    @Size(min = 2, max = 30, message = "document type title must be 2-30 characters long")
    private String title;

    public DocumentTypeCreateCommand() {
    }

    public DocumentTypeCreateCommand(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
