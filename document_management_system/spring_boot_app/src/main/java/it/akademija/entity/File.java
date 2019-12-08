package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user_files")
public class File {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;


    private String fileName;

    public File() {
    }

    public File(String id, String fileName) {
        this.id = id;
        this.fileName = fileName;
    }

    public File(String id, String fileName, Document document) {
        this.id = id;
        this.fileName = fileName;
        this.document = document;
    }

    //    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "document_id")
    @JsonBackReference
    private Document document;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }


    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DBFile)) return false;
        DBFile dbFile = (DBFile) o;
        return Objects.equals(getId(), dbFile.getId()) && Objects.equals(getFileName(), dbFile.getFileName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getFileName());
    }
}
