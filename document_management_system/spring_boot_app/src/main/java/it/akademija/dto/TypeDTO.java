package it.akademija.dto;


import it.akademija.entity.TypeGroup;

import java.util.ArrayList;
import java.util.List;

public class TypeDTO {

    private String title;

    private List<TypeGroup> typeGroups = new ArrayList<>();

    public TypeDTO(String title) {
        this.title = title;
    }

    public TypeDTO(String title, List<TypeGroup> typeGroups) {
        this.title = title;
        this.typeGroups = typeGroups;
    }

    public TypeDTO() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<TypeGroup> getTypeGroups() {
        return typeGroups;
    }

    public void setTypeGroups(List<TypeGroup> typeGroups) {
        this.typeGroups = typeGroups;
    }
}

