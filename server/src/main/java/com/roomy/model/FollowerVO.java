package com.roomy.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

// 나를 팔로우한 회원 테이블
@Setter
@Getter
@ToString
@Entity
@Table(name = "tbl_follower" ,schema="roomyDB")
public class FollowerVO {

    @Id
    private Long friendSeq;

    // 회원 아이디  
    private String userId;

    // 해당 회원을 팔로우 한 회원 아이디
    private String followerUserId;
}
