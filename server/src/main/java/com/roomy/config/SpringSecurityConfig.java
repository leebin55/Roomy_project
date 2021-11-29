package com.roomy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
                // 우선 모든 url 에 대해 permit 해줌
                authorizeRequests()
                .antMatchers("/*").permitAll()
                .and()
                // post 방식을 사용할 때 403오류 방지하기 위해서 추가
                .csrf().disable();
    }
}
