package com.roomy.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_gallery", schema="roomyDB")
public class Board {
    // 게시물 번호 PK
    @Id
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
}
