
package com.hms.user.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hms.user.dto.UserDTO;
import com.hms.user.exception.HmsException;
import com.hms.user.service.UserService;

import java.util.List;

@Service
public class MyUsereDetailsSrvice implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            UserDTO dto = userService.getUser(email);
            if (dto == null) {
                throw new UsernameNotFoundException("User not found with email: " + email);
            }

            // 1. Extract role and provide a fallback string if it's null
            String roleName = (dto.getRole() != null) ? dto.getRole().name() : "USER";

            // 2. Map it to a SimpleGrantedAuthority collection (e.g., "ROLE_USER")
            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + roleName));

            // 3. Pass the valid collection instead of null
            return new CustomUserDetails(
                    dto.getId(),
                    dto.getEmail(),
                    dto.getEmail(),
                    dto.getPassword(),
                    dto.getRole(),
                    dto.getName(),
                    dto.getProfileId(),
                    authorities // passed collection instead of null
            );

        } catch (HmsException e) {
            e.printStackTrace();
            throw new UsernameNotFoundException("Error fetching user during authentication", e);
        }
    }
}

/*
 * package com.hms.user.jwt;
 * 
 * import org.springframework.beans.factory.annotation.Autowired;
 * import org.springframework.security.core.userdetails.UserDetails;
 * import org.springframework.security.core.userdetails.UserDetailsService;
 * import
 * org.springframework.security.core.userdetails.UsernameNotFoundException;
 * import org.springframework.stereotype.Service;
 * 
 * import com.hms.user.dto.UserDTO;
 * import com.hms.user.exception.HmsException;
 * import com.hms.user.service.UserService;
 * 
 * @Service
 * public class MyUsereDetailsSrvice implements UserDetailsService {
 * 
 * private final UserService userService;
 * 
 * MyUsereDetailsSrvice(UserService userService) {
 * this.userService = userService;
 * }
 * 
 * @Override
 * public UserDetails loadUserByUsername(String email) throws
 * UsernameNotFoundException {
 * // TODO Auto-generated method stub
 * try {
 * UserDTO dto = userService.getUser(email);
 * return new CustomUserDetails(dto.getId(), dto.getEmail(), dto.getEmail(),
 * dto.getPassword(), dto.getRole(),
 * dto.getName(), null);
 * } catch (HmsException e) {
 * e.printStackTrace();
 * }
 * return null;
 * }
 * 
 * }
 * 
 */
