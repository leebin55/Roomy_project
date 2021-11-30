package com.roomy.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tbl_board_like" , schema = "roomyDB")
public class BoardLike {

    @Id
    private Long like_seq;
    // 좋아요 게시물 seq FK
    private Long like_board_seq;
    // 좋아요 누른 회원 id
    private String like_user_id;

}
