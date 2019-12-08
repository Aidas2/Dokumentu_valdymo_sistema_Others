package it.akademija.entity;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Type {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    private String title;

    @JsonBackReference
    @OneToMany(
            mappedBy = "primaryKey.type",
            cascade = CascadeType.MERGE,
            orphanRemoval = true)
    private List<TypeGroup> typeGroups = new CopyOnWriteArrayList<>();


    public Type(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public Type() {
    }


    public List<TypeGroup> getTypeGroups() {
        return typeGroups;
    }

    public void setTypeGroups(List<TypeGroup> typeGroups) {
        this.typeGroups = typeGroups;
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

    public void addGroup(TypeGroup typeGroup){
        this.typeGroups.add(typeGroup);
    }

    public void removeGroup(Group group) {
        this.typeGroups.stream().filter(tg -> tg.getGroup().getName().equals(group.getName()))
                .forEach(tg -> typeGroups.remove(tg));
        group.getGroupUsers().remove(this);
    }

}
