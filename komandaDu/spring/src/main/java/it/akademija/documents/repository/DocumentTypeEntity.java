package it.akademija.documents.repository;

import javax.persistence.*;

@Entity
@Table(indexes = {
        @Index(columnList = "title")

})

@NamedQueries({
        @NamedQuery(name = "DocumentTypeEntity.getDocumentTypesToApproveByUsername",
                query = "select distinct dTta from " +
                        "UserEntity ue JOIN ue.userGroups ueG " +
                        "JOIN ueG.availableDocumentTypesToApprove dTta " +
                        "where ue.username=:username")
})
public class DocumentTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "title", unique = true)
    private String title;

    public DocumentTypeEntity() {

    }

    public DocumentTypeEntity(String title) {
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
