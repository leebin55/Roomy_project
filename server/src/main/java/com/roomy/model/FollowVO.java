package com.roomy.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Setter
@Getter
@ToString
@Entity
@Table(name = "tbl_follow" ,schema="roomyDB")
public class FollowVO {

    @Id
    private Long friendSeq;

    // 회원 아이디
    private String userId;

    //  팔로우(친구맺기)를 한 회원 아이디
    private String followUserId;
}
