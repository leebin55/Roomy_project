package com.roomy.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="tbl_board_like" ,schema="roomyDB")
public class LikeVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long like_seq;
    private Long like_board_seq;
    private Long like_user_seq;
}
