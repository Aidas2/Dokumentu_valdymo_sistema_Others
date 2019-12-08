package it.docSys.DTO;

import it.docSys.enums.States;

import java.io.Serializable;

public class PutDocumentDTO implements Serializable {

    private String author;
    private String type;
    private String title;
    private String description;
    private byte attachments;
    private States state = it.docSys.enums.States.SUKURTAS;



    public PutDocumentDTO(String author, String type, String title, String description,
                          byte attachments, States state) {
        this.author = author;
        this.type = type;
        this.title = title;
        this.description = description;
        this.attachments = attachments;
        this.state = state;
    }

    public PutDocumentDTO() {}


    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public byte getAttachments() {
        return attachments;
    }

    public void setAttachments(byte attachments) {
        this.attachments = attachments;
    }

    public States getState() {
        return state;
    }

}