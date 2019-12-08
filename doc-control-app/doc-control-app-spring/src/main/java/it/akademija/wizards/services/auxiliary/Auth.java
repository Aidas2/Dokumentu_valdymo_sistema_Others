package it.akademija.wizards.services.auxiliary;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public final class Auth {

    public static String getUsername() {
        Authentication securityContext;
        if ((securityContext = SecurityContextHolder.getContext().getAuthentication()) != null) {
            Object principal = securityContext.getPrincipal();
            if (principal instanceof UserDetails) {
                return ((UserDetails) principal).getUsername();
            } else {
                return "[AUTO-EXECUTED]";
            }
        }
        return "[AUTO-EXECUTED]";
    }
}
