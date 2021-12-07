package com.roomy.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.roomy.config.auth.Principal;
import com.roomy.model.User;
import com.roomy.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class JwtAuthentizationFilter  extends BasicAuthenticationFilter {

    private final UserRepository userRepository;
    private final HttpSession hSession;

    public JwtAuthentizationFilter(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            HttpSession hSession
                                   ) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.hSession = hSession;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(JwtProps.HEADER_STRING);
        if(header == null || !header.startsWith(JwtProps.TOKEN_PRIPIX)){
            chain.doFilter(request, response);
            return;
        }
        System.out.println("header : " + header);
        String token = request.getHeader(JwtProps.HEADER_STRING).replace(JwtProps.TOKEN_PRIPIX, "");

        String userId = JWT.require(Algorithm.HMAC512(JwtProps.SECRET)).build().verify(token)
                .getClaim("userId").asString();


        if(userId == null) {
            User user = userRepository.findByUserId(userId);

            Principal principalDetails = new Principal(user);
            hSession.setAttribute("principal", principalDetails);
            Authentication authentication
                    = new UsernamePasswordAuthenticationToken(
                            principalDetails.getUsername(),
                            principalDetails.getPassword(),
                            principalDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);


    }
}
