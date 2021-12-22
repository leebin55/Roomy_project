package com.roomy.model;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="tbl_board_like" , schema = "roomyDB")
public class LikeVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long likeSeq;

    // 좋아요 게시물 seq FK
    @Column(name="like_board_seq")
    private Long boardSeq;

    // 좋아요 누른 회원 Seq
    @Column(name="like_user_id")
    private String userId;

}
