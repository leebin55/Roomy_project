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
    private Long commentSeq;

    // 댓글 쓴 게시물 번호
    @Column(name = "comment_board_seq")
    private Long boardSeq;

    // 댓글 단 날짜 시간
    @Column(name="comment_date")
    private String date;

    // 댓글 단 회원 아이디
    @Column(name = "comment_user_seq")
    private String userId;

    // 댓글 내용
    @Column(name="")
    private String content;
}
