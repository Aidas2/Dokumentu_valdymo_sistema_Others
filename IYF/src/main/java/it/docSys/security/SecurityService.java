package it.docSys.security;

public interface SecurityService {

    String findLoggedInUserName();

    void autoLogin(String username, String password);
}

