INSERT INTO tbl_board (board_user_seq,board_title,board_content,board_create_at
                      ,board_code,board_like,board_hit )
VALUES( 1,'첫번째 게시물','여기는 첫번째 게시물 테스트입니다.','2021-11-30',1,0,10);

INSERT INTO tbl_board (board_user_seq,board_title,board_content,board_create_at,board_code
,board_like,board_hit
) VALUES( 1,'두번째 게시물','여기는 두번째~~ 게시물 테스트입니다.','2021-11-30',1,0,0);


/** User Data*/
INSERT INTO tbl_user(user_id,user_password, user_email, user_name,
                     user_rank, user_gender)
                     VALUES(
                            'yub','1234','yub@gmail.com','이유빈',
                            0,1
                           );
INSERT INTO tbl_user(user_id,user_password, user_email, user_name,
                                              user_rank, user_gender)
        VALUES(
        'csy','1234','CSY@gmail.com','최선영',
        1,1
     );
INSERT INTO tbl_user(user_id,user_password, user_email, user_name,
                     user_rank, user_gender)
VALUES(
    'lsm','1234','sungmin@gmail.com','이성민',
    1,0
    );