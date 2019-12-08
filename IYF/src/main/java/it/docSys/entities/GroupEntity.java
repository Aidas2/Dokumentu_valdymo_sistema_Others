package it.docSys.entities;


import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "groupTable")
public class GroupEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", unique = true)
    private String title;


    @ManyToMany (cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(name= "G_Dt",
            joinColumns = @JoinColumn (name="G_ID"),
            inverseJoinColumns = @JoinColumn (name= "Dt_ID"))
    private Set<DocType> docTypes = new HashSet<>();

    @ManyToMany (cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(name= "G_Us",
            joinColumns = @JoinColumn (name="G_ID"),
            inverseJoinColumns = @JoinColumn (name= "Us_ID"))
    private Set<DocUser> docUsers = new HashSet<>();




    public GroupEntity(Long id, String title, Set<DocType> docTypes, Set<DocUser> docUsers) {
        this.id = id;
        this.title = title;
        this.docTypes = docTypes;
        this.docUsers = docUsers;
    }

    public GroupEntity() {
    }

    public Set<DocUser> getDocUsers() {
        return docUsers;
    }

    public void setDocUsers(Set<DocUser> users) {
        this.docUsers = users;
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

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<DocType> getDocTypes() {
        return docTypes;
    }

    public void setDocTypes(Set<DocType> docTypes) {
        this.docTypes = docTypes;
    }


    public void addUser(DocUser docUser) {
        this.docUsers.add(docUser);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GroupEntity groupEntity = (GroupEntity) o;

        return id.equals(groupEntity.id);
    }


    @Override
    public int hashCode() {
        return id.hashCode();
    }
}


