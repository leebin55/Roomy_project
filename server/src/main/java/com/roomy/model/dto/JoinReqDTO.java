package com.roomy.model.dto;

import com.roomy.model.User;
import lombok.Data;

@Data
public class JoinReqDTO {
    private String userId;
    private String password;
    private String email;
    private String birth;
    private int gender;
    private String username;

    public User joinEntity() {
        return User.builder()
                .userId(userId)
                .userPassword(password)
                .userEmail(email)
                .userBirth(birth)
                .userGender(gender)
                .userName(username)
                .role("ROLE_USER")
                .build();
    }
}
