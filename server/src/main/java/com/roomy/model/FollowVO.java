package com.roomy.model;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_follow" ,schema="roomyDB")
public class FollowVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long followSeq;

    // 회원 아이디
    private String userId;

    //  팔로우(친구맺기)를 한 회원 아이디
    private String followUserId;
}
