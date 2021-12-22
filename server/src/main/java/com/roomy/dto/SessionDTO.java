package com.roomy.dto;

import lombok.*;

// session 에 담을 DTO
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class SessionDTO {
    private String userId;
    private String userName;
}