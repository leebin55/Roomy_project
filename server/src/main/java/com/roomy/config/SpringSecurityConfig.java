package com.roomy.config;

import com.roomy.config.jwt.JwtAuthenticationFilter;
import com.roomy.config.jwt.JwtAuthentizationFilter;
import com.roomy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserRepository userRepository;
    private final CorsFilter corsFilter;
    private final HttpSession hSession;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilter(corsFilter)
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(new JwtAuthenticationFilter(authenticationManager()))
                .addFilter(new JwtAuthentizationFilter(authenticationManager(), userRepository, hSession))
                .authorizeRequests()
//                .antMatchers("/room/**")
//                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//                .antMatchers("/admin/**")
//                .access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll();
    }
}
