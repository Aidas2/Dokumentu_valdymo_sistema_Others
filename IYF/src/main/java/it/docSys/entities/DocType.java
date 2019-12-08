package it.docSys.entities;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table (name = "doc_type")
public class DocType implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "documentType_id")
    private Long id;

    @Column(name = "doc_type", unique = true, nullable = false)
    private String title;


    @OneToMany (mappedBy = "docType")
    private List<Document> documents = new ArrayList<>();

    public void addDocument (Document document) {
        this.documents.add(document);
        document.setType(this.title);
    }

    @ManyToMany(mappedBy = "docTypes")
    private Set<GroupEntity> groups = new HashSet<>();


    public DocType() {
    }

    public DocType(String title, List<Document> documents, Set<GroupEntity> groups) {
        this.title = title;
        this.documents = documents;
        this.groups = groups;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {

        return title;
    }

    public void setTitle(String docType) {

        this.title = docType;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public Set<GroupEntity> getGroups() {
        return groups;
    }

    public void setGroups(Set<GroupEntity> groups) {
        this.groups = groups;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DocType docType = (DocType) o;

        return id.equals(docType.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }



}
