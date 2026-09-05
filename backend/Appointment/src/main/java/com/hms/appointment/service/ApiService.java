package com.hms.appointment.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ApiService {

    @Autowired
    private WebClient.Builder webClient;

    public Mono<Boolean> profileExists(Long id) {
      
            return webClient.build().post().uri("http://localhost:9100/profile/doctor/add").bodyValue(userDTO)
                    .retrieve().bodyToMono(Long.class);
       
            return webClient.build().post().uri("http://localhost:9100/profile/patient/add").bodyValue(userDTO)
                    .retrieve().bodyToMono(Long.class);
        }
       

    }

}
