package com.roomy.model;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
@Table(name ="tbl_user" , schema = "roomyDB")
public class UserVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //회원번호
    private Long user_seq;
    // 화원 아이디
    private String user_id;
    // 비밀번호
    private String user_password;
    // 이메일
    private String user_email;
    // 회원 등급
    private int user_rank;
    // 성별
    private int user_gender;
    // 생년월일
    private String user_birth;
    // 프로필 사진
    @Column(nullable = true)
    private String user_profile;
    // 회원 이름
    private String user_name;

}
