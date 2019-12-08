package it.akademija.wizards.models.user;

import java.util.List;

public class UserGetGroupDocTypes {

    private String groupTitle;
    private List<String> reviewDocTypes;
    private List<String> submitDocTypes;

    public UserGetGroupDocTypes() {
    }

    public UserGetGroupDocTypes(String groupTitle, List<String> reviewDocTypes, List<String> submitDocTypes) {
        this.groupTitle = groupTitle;
        this.reviewDocTypes = reviewDocTypes;
        this.submitDocTypes = submitDocTypes;
    }

    public String getGroupTitle() {
        return groupTitle;
    }

    public void setGroupTitle(String groupTitle) {
        this.groupTitle = groupTitle;
    }

    public List<String> getReviewDocTypes() {
        return reviewDocTypes;
    }

    public void setReviewDocTypes(List<String> reviewDocTypes) {
        this.reviewDocTypes = reviewDocTypes;
    }

    public List<String> getSubmitDocTypes() {
        return submitDocTypes;
    }

    public void setSubmitDocTypes(List<String> submitDocTypes) {
        this.submitDocTypes = submitDocTypes;
    }
}
