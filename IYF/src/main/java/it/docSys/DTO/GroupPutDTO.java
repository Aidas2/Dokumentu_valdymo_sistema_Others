package it.docSys.DTO;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

public class GroupPutDTO {

    @NotNull
    @Length(min = 1, max = 200)
    private String title;


    public GroupPutDTO(@NotNull @Length(min = 1, max = 200) String title) {
        this.title = title;
    }

    public GroupPutDTO() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


}
