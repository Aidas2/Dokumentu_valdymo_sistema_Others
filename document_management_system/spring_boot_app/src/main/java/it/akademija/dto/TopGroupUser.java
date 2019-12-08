package it.akademija.dto;

public class TopGroupUser {

    Integer count;

    String email;

    public TopGroupUser(Integer count, String email) {
        this.count = count;
        this.email = email;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
