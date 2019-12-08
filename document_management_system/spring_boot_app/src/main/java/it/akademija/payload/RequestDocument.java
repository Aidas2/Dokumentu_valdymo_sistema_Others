package it.akademija.payload;

import it.akademija.entity.Type;
import it.akademija.entity.UserDocument;

import java.util.List;

public final class RequestDocument {

    private String title;

    private String description;

    private Type type;

    private String typeTitle;

    private String email;

    private String uniqueNumber;

    private String fileName;

    private List<UserDocument> documentTypes;


    public RequestDocument() {
    }

    public RequestDocument(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public RequestDocument(String title, String description, List<UserDocument> documentTypes) {
        this.title = title;
        this.description = description;
        this.documentTypes = documentTypes;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUniqueNumber() {
        return uniqueNumber;
    }

    public void setUniqueNumber(String uniqueNumber) {
        this.uniqueNumber = uniqueNumber;
    }

    public String getTypeTitle() {
        return typeTitle;
    }

    public void setTypeTitle(String typeTitle) {
        this.typeTitle = typeTitle;
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public List<UserDocument> getDocumentTypes() {
        return documentTypes;
    }

    public void setDocumentTypes(List<UserDocument> documentTypes) {
        this.documentTypes = documentTypes;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }


}
