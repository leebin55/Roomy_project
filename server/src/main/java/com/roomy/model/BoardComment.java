package com.roomy.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tbl_board_comment")
public class BoardComment {
    @Id
    private Long comment_seq;
    // 댓글 쓴 게시물 번호
    private Long comment_board_seq;
    // 댓글 단 날짜 시간
    private String comment_date;
    //
    private String comment_user_id;
}
