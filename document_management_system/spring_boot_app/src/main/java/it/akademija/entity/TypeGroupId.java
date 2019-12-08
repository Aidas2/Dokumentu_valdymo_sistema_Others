package it.akademija.entity;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class TypeGroupId implements Serializable {

    private Type type;
    private Group group;

    public TypeGroupId() {
    }

    @ManyToOne(cascade = CascadeType.MERGE)
    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    @ManyToOne(cascade = CascadeType.MERGE)
    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }


}
