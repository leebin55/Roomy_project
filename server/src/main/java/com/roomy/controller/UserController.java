package com.roomy.controller;

import com.roomy.config.auth.Principal;
import com.roomy.model.User;
import com.roomy.model.dto.JoinReqDTO;
import com.roomy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(value="/room")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/join")
    public User join(@RequestBody JoinReqDTO joinReqDTO){
        joinReqDTO.setPassword(bCryptPasswordEncoder.encode(joinReqDTO.getPassword()));
        return userRepository.save(joinReqDTO.joinEntity());
    }

    @GetMapping("/user")
    public String user(Authentication authentication){
        Principal principal = (Principal) authentication.getPrincipal();
        System.out.println("principal : " + principal.getUser().getUserId());
        System.out.println("principal : " + principal.getUser().getUserPassword());
        System.out.println("principal : " + principal.getUser().getRole());
        return "<h1>ok ok</h1>";
    }
}
