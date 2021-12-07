package com.roomy.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.roomy.config.auth.Principal;
import com.roomy.model.dto.LoginReqDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        System.out.println("JwtAuthenticationFilter ok!!");

        ObjectMapper objM = new ObjectMapper();
        LoginReqDTO loginRequestDto = null;
        try{

            loginRequestDto = objM.readValue(request.getInputStream(), LoginReqDTO.class);

        }catch(Exception e) {
            e.printStackTrace();
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getUserId(),
                        loginRequestDto.getPassword());

        System.out.println("JwtAuthenticationFilter : 토큰 생성 ok");
        Authentication authentication =
                authenticationManager.authenticate(authenticationToken);

        return authentication;
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException, ServletException {

        Principal principalDetails = (Principal) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProps.EXPIRATION_TIME))
                .withClaim("id", principalDetails.getUser().getUserSeq())
                .withClaim("userId", principalDetails.getUser().getUserId())
                .sign(Algorithm.HMAC512(JwtProps.SECRET));

        response.addHeader(JwtProps.HEADER_STRING, JwtProps.TOKEN_PRIPIX+jwtToken);

    }
}
