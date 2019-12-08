package it.akademija.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
public class Document implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String uniqueNumber;

    private String title;

    private String description;

    private Type type;

    private Date createdDate;

    private Date submittedDate;

    private Date confirmedDate;

    private Date rejectedDate;

    private List<UserDocument> userDocuments = new ArrayList<UserDocument>();

    private List<File> dbFiles = new ArrayList<>();


    @Column(name = "CREATED_DATE")
    @Temporal(TemporalType.DATE)
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    @Column(name = "SUBMITTED_DATE", nullable = true)
    @Temporal(TemporalType.DATE)
    public Date getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(Date submittedDate) {
        this.submittedDate = submittedDate;
    }


    @Column(name = "CONFIRMED_DATE")
    @Temporal(TemporalType.DATE)
    public Date getConfirmedDate() {
        return confirmedDate;
    }

    public void setConfirmedDate(Date confirmedDate) {
        this.confirmedDate = confirmedDate;
    }


    @Column(name = "REJECTED_DATE")
    @Temporal(TemporalType.DATE)
    public Date getRejectedDate() {
        return rejectedDate;
    }

    public void setRejectedDate(Date rejectedDate) {
        this.rejectedDate = rejectedDate;
    }

    public Document() {
    }

    public Document(Long id, String uniqueNumber, String title, String description, Type type, Date createdDate, Date submittedDate) {
        this.id = id;
        this.uniqueNumber = uniqueNumber;
        this.title = title;
        this.description = description;
        this.type = type;
        this.createdDate = createdDate;
        this.submittedDate = submittedDate;
    }

    public Document(Long id, String title, String description, Type type, Date createdDate, List<UserDocument> userDocuments) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.createdDate = createdDate;
        this.userDocuments = userDocuments;
    }

    public Document(Long id, String uniqueNumber, String title, String description, Date createdDate) {
        this.id = id;
        this.uniqueNumber = uniqueNumber;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
    }

    //    @JsonIgnore
    @JsonBackReference
    @OneToMany(
            mappedBy = "primaryKey.document",
            cascade = CascadeType.MERGE,
//            fetch=FetchType.EAGER,
            orphanRemoval = true)
    public List<UserDocument> getUserDocuments() {
        return userDocuments;
    }

    public void setUserDocuments(List<UserDocument> userDocuments) {
        this.userDocuments = userDocuments;
    }

    public void addUserDocument(UserDocument userDocument){
        this.userDocuments.add(userDocument);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NaturalId
    @Column(updatable = false, nullable = false)
    public String getUniqueNumber() {
        return uniqueNumber;
    }

    public void setUniqueNumber(String uniqueNumber) {
        this.uniqueNumber = uniqueNumber;
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type_id")
    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }


    public void addUser(UserDocument user){
        this.userDocuments.add(user);
    }


    @OneToMany(mappedBy = "document", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JsonIgnore
    public List<File> getDbFiles() {
        return dbFiles;
    }

    public void setDbFiles(List<File> dbFiles) {
        this.dbFiles = dbFiles;
    }


    public void addDbFile(File f) {
        this.dbFiles.add(f);
        if(f.getDocument() != this)
            f.setDocument(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        Document document = (Document) o;
        return Objects.equals(id, document.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();
        builder.append("Document [uniqueNumber=").append(uniqueNumber).append("]");
        return builder.toString();
    }

}
