package com.hms.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HmsException.class)
    public ResponseEntity<Map<String, Object>> handleHmsException(HmsException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        
        // ex.getMessage() extracts the "msg" string passed into your constructor
        body.put("errorMessage", ex.getMessage());
        body.put("errorCode", HttpStatus.BAD_REQUEST.value()); // Status 400
        body.put("timestamp", LocalDateTime.now().toString());

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
} 