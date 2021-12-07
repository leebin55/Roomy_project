package com.roomy.config.auth;

import com.roomy.model.User;
import com.roomy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
@RequiredArgsConstructor
public class PrincipalService implements UserDetailsService {

    private final UserRepository userRepository;
    private final HttpSession hSession;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService ok!!");
        User user = userRepository.findByUserId(username);
        Principal principal = new Principal(user);
        hSession.setAttribute("principal", principal);
        return principal;
    }
}
