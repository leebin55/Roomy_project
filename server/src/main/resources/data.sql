INSERT INTO tbl_board (board_user_seq,board_title,board_content,board_create_at
                      ,board_code,board_like,board_hit )
VALUES( 1,'첫번째 게시물','여기는 첫번째 게시물 테스트입니다.','2021-11-30',1,0,10);

INSERT INTO tbl_board (board_user_seq,board_title,board_content,board_create_at,board_code
,board_like,board_hit
) VALUES( 1,'두번째 게시물','여기는 두번째~~ 게시물 테스트입니다.','2021-11-30',1,0,0);

INSERT INTO tbl_board_image (img_board_seq,img_url)
VALUES( 1,'https://images.unsplash.com/photo-1522770179533-24471fcdba45');

INSERT INTO tbl_board_image (img_board_seq,img_url)
VALUES( 2,'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c');


/** User Data*/
-- INSERT INTO tbl_user(user_id,user_password, user_email, user_name,
--                      user_rank, user_gender)
--                      VALUES(
--                             'yub','1234','yub@gmail.com','이유빈',
--                             0,1
--                            );
-- INSERT INTO tbl_user(user_id,user_password, user_email, user_name,
--                                               user_rank, user_gender)
--         VALUES(
--         'csy','1234','CSY@gmail.com','최선영',
--         1,1
--      );
-- INSERT INTO tbl_user(user_id,user_password, user_email, user_name,
--                      user_rank, user_gender)
-- VALUES(
--     'lsm','1234','sungmin@gmail.com','이성민',
--     1,0
--     );