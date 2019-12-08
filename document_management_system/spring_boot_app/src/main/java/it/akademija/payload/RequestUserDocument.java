package it.akademija.payload;


public final class RequestUserDocument {


    private boolean saved;

    private boolean confirmed;

    private boolean submitted;

    private boolean rejected;

    private String email;

    public RequestUserDocument() {
    }

    public RequestUserDocument(boolean saved, boolean confirmed, boolean submitted, boolean rejected) {
        this.saved = saved;
        this.confirmed = confirmed;
        this.submitted = submitted;
        this.rejected = rejected;
    }

    public boolean isSaved() {
        return saved;
    }

    public void setSaved(boolean saved) {
        this.saved = saved;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    public boolean isSubmitted() {
        return submitted;
    }

    public void setSubmitted(boolean submitted) {
        this.submitted = submitted;
    }

    public boolean isRejected() {
        return rejected;
    }

    public void setRejected(boolean rejected) {
        this.rejected = rejected;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
