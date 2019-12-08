package it.docSys.DTO;

import java.io.Serializable;

public class GetCreatedDocumentDTO implements Serializable {

    private Long id;
    private String author;
    private String type;
    private String name;
    private String description;
    private String addressee;
    private byte attachments;



    public GetCreatedDocumentDTO(Long id, String author, String type, String name, String description,
                                 String addressee, byte attachments) {
        this.id = id;
        this.author = author;
        this.type = type;
        this.name = name;
        this.description = description;
        this.addressee = addressee;
        this.attachments = attachments;
    }

    public GetCreatedDocumentDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getAddressee() {
        return addressee;
    }

    public void setAddressee(String addressee) {
        this.addressee = addressee;
    }


    public byte getAttachments() {
        return attachments;
    }

    public void setAttachments(byte attachments) {
        this.attachments = attachments;
    }
}
