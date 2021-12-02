package com.roomy.model;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="tbl_board_comment")
public class CommentVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long comment_seq;
    // 댓글 쓴 게시물 번호
    private Long comment_board_seq;
    // 댓글 단 날짜 시간
    private String comment_date;
    // 댓글 단 회원 아이디
    private String comment_user_id;
    // 댓글 내용
    private String comment_content;
}
