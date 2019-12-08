package it.akademija.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_document")
@AssociationOverrides({
        @AssociationOverride(name = "primaryKey.document",
        joinColumns = @JoinColumn(name = "DOCUMENT_ID")),
        @AssociationOverride(name = "primaryKey.user",
        joinColumns = @JoinColumn(name = "USER_ID")) })
public class UserDocument {

    private UserDocumentId primaryKey = new UserDocumentId();

    @Column(name="saved")
    private boolean saved = true;

    @Column(name="confirmed")
    private boolean confirmed = false;

    @Column(name="submitted")
    private boolean submitted = false;

    @Column(name="rejected")
    private boolean rejected = false;

    @Column(name="message", nullable = true)
    private String message;

    public UserDocument() {
    }

    @EmbeddedId
    public UserDocumentId getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(UserDocumentId primaryKey) {
        this.primaryKey = primaryKey;
    }

    @Transient
    public Document getDocument() {
        return getPrimaryKey().getDocument();
    }

    public void setDocument(Document document) {
        getPrimaryKey().setDocument(document);
    }

    @Transient
    public User getUser() {
        return getPrimaryKey().getUser();
    }

    public void setUser(User user) {
        getPrimaryKey().setUser(user);
    }

    public boolean isSaved() {
        return saved;
    }

    public void setSaved(boolean saved) {
        this.saved = saved;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }


    public boolean isSubmitted() {
        return submitted;
    }

    public void setSubmitted(boolean submitted) {
        this.submitted = submitted;
    }

    public boolean isRejected() {
        return rejected;
    }

    public void setRejected(boolean rejected) {
        this.rejected = rejected;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    //
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//
//        if (o == null || getClass() != o.getClass())
//            return false;
//
//        InstitutionBook that = (InstitutionBook) o;
//        return Objects.equals(institution, that.institution) &&
//                Objects.equals(book, that.book);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(institution, book);
//    }
}
