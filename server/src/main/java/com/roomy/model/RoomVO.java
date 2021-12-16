package com.roomy.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tbl_room", schema="roomyDB")
public class RoomVO {

    // 각 회원당 room 은 하나씩만 가질 수 있기때문에
    // PK 는 회원번호
    @Id
    private Long userSeq;

    // room 이름
    private String roomName;

    // room 방문자수
    private int roomTotal;

    // room 소개글
    private String roomIntroduce;

    // room 좋아요 수
    // private int roomLike;
}
