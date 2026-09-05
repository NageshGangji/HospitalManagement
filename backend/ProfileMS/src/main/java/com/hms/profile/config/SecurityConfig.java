package com.hms.profile.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
    // Exception {
    // // http
    // // .csrf(csrf -> csrf.disable()) // Correct way to disable CSRF in Spring
    // Boot 3+
    // // .authorizeHttpRequests(auth -> auth
    // // .anyRequest().permitAll() // Replaces the conflicting "/**" and
    // "anyRequest()" combo
    // // );

    // // return http.build();
    // http.csrf().disable().authrorizeHttpRequests(auth->auth.requestMatchers(request->"SECRET".equals(request.getHeaders("X-Secret-Key")))).permitAll().anyRequest().denyAll());
    // return http.build();
    // }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // 1. Disable CSRF
                .authorizeHttpRequests(auth -> auth
                        // 2. Allow login and register to bypass the secret key check
                        .requestMatchers("/user/login", "/user/register").permitAll()

                        // 3. For any other request, strictly validate your secret header
                        .anyRequest().access((authentication, context) -> {
                            String secretHeader = context.getRequest().getHeader("X-Secret-Key");
                            boolean isValidSecret = "SECRET".equals(secretHeader);

                            return new org.springframework.security.authorization.AuthorizationDecision(isValidSecret);
                        }));

        return http.build();
    }
}