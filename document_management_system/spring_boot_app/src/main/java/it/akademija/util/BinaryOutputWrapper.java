package it.akademija.util;

import org.springframework.http.HttpHeaders;

public final class BinaryOutputWrapper {

     private  byte [] data;
     private  HttpHeaders headers;

    public BinaryOutputWrapper() {
    }

    public BinaryOutputWrapper(byte[] data, HttpHeaders headers) {
        this.data = data;
        this.headers = headers;

    }

    public byte[] getData() {
        return data;
    }


    public HttpHeaders getHeaders() {
        return headers;
    }

}
