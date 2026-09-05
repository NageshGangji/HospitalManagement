package com.hms.user.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private static final Long JWT_TOKEN_VALIDITY = 5 * 60 * 60L;

    private static final String SECRET = "6cae14a43493998ab020abac2cd22b3a2d927361c5942f5ac656907b2ae0fcdbbd3fb1edba9f1a21c8db6fd74a8754d6d2de4ef07dfef00c0ee6d10426f22362";

    SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public String genrateToken(UserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails user = (CustomUserDetails) userDetails;
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("name", user.getName());
        claims.put("profileId", user.getProfileId());
        return doGenrateToken(claims, userDetails.getUsername());

    }

    public String doGenrateToken(Map<String, Object> claims, String Subject) {
        // return Jwts.builder().setClaims(claims).setSubject(Subject).setIssuedAt(new
        // Date(System.currentTimeMillis())).setExpiration(new
        // Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY*10000)).signWith(SignatureAlgorithm.HS512,SECRET).compact();

        return Jwts.builder()
                .claims(claims) // Updated method name (no 'set')
                .subject(Subject) // Updated method name (no 'set')
                .issuedAt(new Date(System.currentTimeMillis())) // Updated method name (no 'set')
                .expiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 10000)) // Updated method name
                .signWith(key) // Modern signWith accepts the Key directly
                .compact();

    }

}
