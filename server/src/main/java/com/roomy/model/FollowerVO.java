package com.roomy.model;

import lombok.*;

import javax.persistence.*;

// 나를 팔로우한 회원 테이블
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_follower" ,schema="roomyDB")
public class FollowerVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long followerSeq;

    // 회원 아이디  
    private String userId;

    // 해당 회원을 팔로우 한 회원 아이디
    private String followerUserId;
}
