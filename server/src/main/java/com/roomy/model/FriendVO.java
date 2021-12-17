package com.roomy.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_friend" ,schema="roomyDB")
public class FriendVO {

    @Id
    private Long friendSeq;

    // 회원번호
    private String userId;

    // 친구맺은 회원 번호
    private String friendUserId;
}
