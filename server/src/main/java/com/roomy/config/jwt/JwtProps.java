package com.roomy.config.jwt;

// 여기는 그냥 깔끔하게 JwtTokenProvider 에서
// 헤더와 페이로드 저장할때 시크릿키랑 토큰유효시간 설정할때 깔끔하게 쓸라고 만들어놓은 인터페이스임
public interface JwtProps {

    String SECRET = "ROOMY";
    int EXPIRATION_TIME = 1000 * 60 * 10;

}
