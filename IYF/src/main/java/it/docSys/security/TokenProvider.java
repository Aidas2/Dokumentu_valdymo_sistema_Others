package it.docSys.security;

import java.util.*;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;
import io.jsonwebtoken.Jwts;

@Component
public class TokenProvider {

        private String secretKey;

        private int jwtExpiration;

        public String generateToken(Authentication authentication) {
            MyUserPrincipal userPrincipal = (MyUserPrincipal) authentication.getPrincipal();

            Date now = new Date();
            Date expiryDate = new Date(now.getTime() + jwtExpiration);

            return Jwts.builder().
                    setSubject(authentication.getName())
                    .setIssuedAt(new Date())
                    .setExpiration(expiryDate)
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();

        }

        public String getUserIdFromJWT(String token) {
            Claims claims =  Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        }

        public boolean validateToken(String authToken) {
            try {
                Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
                return true;
            } catch (SignatureException ex) {

            } catch (MalformedJwtException ex) {

            } catch (ExpiredJwtException ex) {

            } catch (UnsupportedJwtException ex) {

            } catch (IllegalArgumentException ex) {

            }
            return false;
        }

    }
