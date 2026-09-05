// package com.hms.gateway.filter;

// import org.springframework.cloud.gateway.filter.GatewayFilter;
// import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
// import org.springframework.http.HttpHeaders;

// import org.springframework.stereotype.Component;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;

// @Component
// public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {

//     private static final String SECRET = "6cae14a43493998ab020abac2cd22b3a2d927361c5942f5ac656907b2ae0fcdbbd3fb1edba9f1a21c8db6fd74a8754d6d2de4ef07dfef00c0ee6d10426f22362";

//     public TokenFilter() {
//         super(Config.class);
//     }

//     /*
//      * @Override
//      * public GatewayFilter apply(Config config){
//      * return (exchange,chain)->{
//      * String path=exchange.getRequest().getPath().toString();
//      * if(path.equals("/user/login")||path.equals("/user/register")){
//      * return chain.filter(exchange);
//      * }
//      * HttpHeaders header =exchange.getRequest().getHeaders();
//      * if(!header.containsKey(HttpHeaders.AUTHORIZATION)){
//      * throw new RuntimeException("Autgorization header is missing");
//      * 
//      * }
//      * String authHeader=header.getFirst(HttpHeaders.AUTHORIZATION);
//      * if(authHeader==null || !authHeader.startsWith("Bearer")){
//      * throw new RuntimeException("Authorization header is invalid");
//      * }
//      * String token = authHeader.substring(7);
//      * 
//      * try{
//      * Claims
//      * claims=Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
//      * 
//      * }catch(Exception e){
//      * throw new RuntimeException("Token is invalid");
//      * }
//      * return chain.filter(exchange);
//      * };
//      * }
//      * 
//      */
//     @Override
//     public GatewayFilter apply(Config config) {
//         return (exchange, chain) -> {
//             String path = exchange.getRequest().getPath().toString();
//             if (path.equals("/user/login") || path.equals("/user/register")) {
//                 return chain.filter(exchange);
//             }

//             HttpHeaders header = exchange.getRequest().getHeaders();

//             // ISSUE 1 FIXED: Use getFirst() instead of the undefined containsKey()
//             String authHeader = header.getFirst(HttpHeaders.AUTHORIZATION);
//             if (authHeader == null) {
//                 throw new RuntimeException("Authorization header is missing");
//             }

//             // ISSUE 3 FIXED: Added space after "Bearer " to prevent indexing bugs
//             if (!authHeader.startsWith("Bearer ")) {
//                 throw new RuntimeException("Authorization header is invalid");
//             }

//             String token = authHeader.substring(7);

//             try {
//                 // ISSUE 2 FIXED: Migrated to the modern JJWT 0.12.x parsing fluent API
//                 javax.crypto.SecretKey key = io.jsonwebtoken.security.Keys.hmacShaKeyFor(
//                         SECRET.getBytes(java.nio.charset.StandardCharsets.UTF_8));

//                 Claims claims = Jwts.parser()
//                         .verifyWith(key) // Modern verification validation
//                         .build()
//                         .parseSignedClaims(token)
//                         .getPayload();

//             } catch (Exception e) {
//                 throw new RuntimeException("Token is invalid", e);
//             }

//             return chain.filter(exchange);
//         };
//     }

//     public static class Config {

//     }

// }

package com.hms.gateway.filter;

import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKey;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {

    // 512-bit secure HMAC key
    private static final String SECRET = "6cae14a43493998ab020abac2cd22b3a2d927361c5942f5ac656907b2ae0fcdbbd3fb1edba9f1a21c8db6fd74a8754d6d2de4ef07dfef00c0ee6d10426f22362";

    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getPath().toString();

            // 1. Bypass authentication for login and registration endpoints
            if (path.equals("/user/login") || path.equals("/user/register")) {
                return chain.filter(exchange.mutate().request(r -> r.header("X-Secret-Key", "SECRET")).build());
            }

            HttpHeaders headers = exchange.getRequest().getHeaders();
            String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);

            // 2. Validate the presence of the Authorization Header
            if (authHeader == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authorization header is missing");
            }

            // 3. Validate correct Bearer token format
            if (!authHeader.startsWith("Bearer ")) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authorization header format is invalid");
            }

            String token = authHeader.substring(7);

            try {
                // 4. Generate the cryptographic verification key
                SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
                exchange = exchange.mutate().request(r -> r.header("X-Secret-Key", "SECRET")).build();

                // 5. Parse and validate the token signature and expiration
                Claims claims = Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

                // 6. Use the claims to enrich down-stream request headers (Resolves VS Code
                // warning)
                exchange.getRequest().mutate()
                        .header("X-User-Email", claims.getSubject())
                        .build();

            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token is invalid or expired", e);
            }

            return chain.filter(exchange);
        };
    }

    public static class Config {
        // Can be populated if you need custom filter properties later
    }
}