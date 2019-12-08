package it.docSys.security;

import it.docSys.entities.DocUser;

public interface UserServiceInt {
    void save(DocUser user);

    DocUser findByUserName(String username);
}