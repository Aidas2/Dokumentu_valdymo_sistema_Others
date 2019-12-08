package it.akademija.payload;

public final  class RequestGroup {

    private String name;

    private String email;


    public RequestGroup() {
    }

    public RequestGroup(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
