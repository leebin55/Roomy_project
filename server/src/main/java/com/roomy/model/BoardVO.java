package com.roomy.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@ToString
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_board", schema="roomyDB")
public class BoardVO {
    // 게시물 번호 PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long board_seq;
    // 작성한 회원 번호 FK
    private Long board_user_seq;
    // 게시물 제목
    private String board_title;
    // 게시물 내용
    private String board_content;
    // 게시물 작성 시간
    private String board_create_at;
    // 게시물 수정 시간
    private String board_update_at;
    // 게시물 공개 여부( 기본값 false(공개)/ ture(비공개) ) 
    private Boolean board_private;
    // 좋아요 수 
    private int board_like;
    // 게시물 구분코드
    private int board_code;
    // 조회수
    @ColumnDefault("0")
    private int board_hit=0;
}
