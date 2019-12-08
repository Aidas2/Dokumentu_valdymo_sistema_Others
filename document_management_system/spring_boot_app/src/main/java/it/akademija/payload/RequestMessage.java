package it.akademija.payload;

public final class RequestMessage {

    private String message;

    public RequestMessage(String message) {
        this.message = message;
    }

    public RequestMessage() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
