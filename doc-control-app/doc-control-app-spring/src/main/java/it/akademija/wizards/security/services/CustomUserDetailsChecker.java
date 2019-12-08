package it.akademija.wizards.security.services;

import it.akademija.wizards.security.models.UserPrincipal;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsChecker;

public class CustomUserDetailsChecker implements UserDetailsChecker {

    @Override
    public void check(UserDetails userDetails) {

        if (userDetails instanceof UserPrincipal) {
            UserPrincipal user = (UserPrincipal) userDetails;
            if (!user.isAccountNonLocked()) {
                throw new LockedException("Vartotojo prieiga prie sistemos apribota administratoriaus.");
            }
        }
    }
}
