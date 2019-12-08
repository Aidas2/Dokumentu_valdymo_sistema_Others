package it.akademija.wizards.models.stats;

import java.util.List;

public class StatsGetUserCommand {

    private String documentTypeTitle;
    private List<TypeUserStats> topSubmittingUsers;

    public StatsGetUserCommand() {
    }

    public StatsGetUserCommand(String documentTypeTitle, List<TypeUserStats> topSubmittingUsers) {
        this.documentTypeTitle = documentTypeTitle;
        this.topSubmittingUsers = topSubmittingUsers;
    }

    public String getDocumentTypeTitle() {
        return documentTypeTitle;
    }

    public void setDocumentTypeTitle(String documentTypeTitle) {
        this.documentTypeTitle = documentTypeTitle;
    }

    public List<TypeUserStats> getTopSubmittingUsers() {
        return topSubmittingUsers;
    }

    public void setTopSubmittingUsers(List<TypeUserStats> topSubmittingUsers) {
        this.topSubmittingUsers = topSubmittingUsers;
    }
}
