package it.akademija.entity;


import javax.persistence.*;

@Entity
@Table(name = "type_group")
@AssociationOverrides({
        @AssociationOverride(name = "primaryKey.type",
                joinColumns = @JoinColumn(name = "TYPE_ID")),
        @AssociationOverride(name = "primaryKey.group",
                joinColumns = @JoinColumn(name = "GROUP_ID")) })
public class TypeGroup {

    private TypeGroupId primaryKey = new TypeGroupId();

    @Column(name="receive")
    private boolean receive = false;

    @Column(name="send")
    private boolean send = false;


    @EmbeddedId
    public TypeGroupId getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(TypeGroupId primaryKey) {
        this.primaryKey = primaryKey;
    }

    @Transient
    public Type getType() {
        return getPrimaryKey().getType();
    }

    public void setType(Type type) {
        getPrimaryKey().setType(type);
    }

    @Transient
    public Group getGroup() {
        return getPrimaryKey().getGroup();
    }

    public void setGroup(Group group) {
        getPrimaryKey().setGroup(group);
    }

    public boolean isReceive() {
        return receive;
    }

    public void setReceive(boolean receive) {
        this.receive = receive;
    }

    public boolean isSend() {
        return send;
    }

    public void setSend(boolean send) {
        this.send = send;
    }
}
