package com.roomy.config.jwt;

public interface JwtProps {
    String SECRET = "ROOMY";
    int EXPIRATION_TIME = 1000 * 60 * 10;
    String TOKEN_PRIPIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
