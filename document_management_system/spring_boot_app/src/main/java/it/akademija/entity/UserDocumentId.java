package it.akademija.entity;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class UserDocumentId implements Serializable {

    private Document document;
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE)
    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    @ManyToOne(cascade = CascadeType.MERGE)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserDocumentId() {
    }

    //    @Column(name = "institution_id")
//    private Long institutionId;
//
//    @Column(name = "book_id")
//    private Long bookId;
//
//    public InstitutionBookId() {
//    }
//
//    public InstitutionBookId(Long institutionId, Long bookId) {
//        this.institutionId = institutionId;
//        this.bookId = bookId;
//    }
//
//    public Long getInstitutionId() {
//        return institutionId;
//    }
//
//    public void setInstitutionId(Long institutionId) {
//        this.institutionId = institutionId;
//    }
//
//    public Long getBookId() {
//        return bookId;
//    }
//
//    public void setBookId(Long bookId) {
//        this.bookId = bookId;
//    }

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//
//        if (o == null || getClass() != o.getClass())
//            return false;
//
//        Institution that = (InstitutionBookId) o;
//        return Objects.equals(institutionId, that.institutionId) &&
//                Objects.equals(bookId, that.bookId);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(institutionId, bookId);
//    }
}
