package com.roomy.model;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="tbl_user" , schema = "roomyDB")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //회원번호
    private Long userSeq;
    // 화원 아이디
    private String userId;
    // 비밀번호
    private String userPassword;
    // 이메일
    private String userEmail;
    // 성별
    private int userGender;
    // 생년월일
    private String userBirth;
    // 프로필 사진
    @Column(nullable = true)
    private String userprofile;
    // 회원 이름
    private String userName;

    private String role;

}