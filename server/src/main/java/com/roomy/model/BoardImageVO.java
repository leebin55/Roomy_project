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
    private Long img_seq;
    // 이미지 파일명
    private String img_file;
    // 해당 게시물 번호 FK
    private Long img_board_seq;
}
