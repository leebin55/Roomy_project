package com.roomy.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

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
    private Long boardSeq;
    // 작성한 회원 번호 FK
    private Long boardUserSeq;
    // 게시물 제목
    private String boardTitle;
    // 게시물 내용
    @Column(columnDefinition = "VARCHAR(4000)")
    private String boardContent;
    // 게시물 작성 시간
    private String boardCreateAt;
    // 게시물 수정 시간
    private String boardUpdateAt;
    // 게시물 공개 여부( 기본값 0(공개)/ 1(비공개) /2 친구공개)
    @ColumnDefault("0")
    private int boardPrivate;
    // 좋아요 수
    @ColumnDefault("0")
    private int boardLike;
    // 게시물 구분코드
    private int boardCode;
    // 조회수
    @ColumnDefault("0")
    private int boardHit=0;
}
