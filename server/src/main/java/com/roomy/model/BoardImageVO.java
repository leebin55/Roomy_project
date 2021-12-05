package com.roomy.model;


import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="tbl_board_image")
public class BoardImageVO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long imgSeq;
    // 이미지 파일 url
    private String imgUrl;
    // 해당 게시물 번호 FK
    private Long imgBoardSeq;
}
