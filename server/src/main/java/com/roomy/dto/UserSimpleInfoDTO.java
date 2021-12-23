package com.roomy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter@Setter@ToString
public class UserSimpleInfoDTO {
    private String userId;
    private String userName;
    private String userEmail;
    private String userBirth;

}
