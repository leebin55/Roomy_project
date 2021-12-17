INSERT INTO tbl_board (board_user_id,board_title,board_content,board_create_at
                      ,board_code,board_like,board_hit )
VALUES( 'testid','첫번째 게시물','여기는 첫번째 게시물 테스트입니다.','2021-11-30',1,0,10);

INSERT INTO tbl_board (board_user_id,board_title,board_content,board_create_at,board_code
,board_like,board_hit
) VALUES( 'testid','두번째 게시물','여기는 두번째~~ 게시물 테스트입니다.','2021-11-30',1,0,0);

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

INSERT INTO tbl_user(user_id, user_password, user_email, user_gender, user_birth, user_name, user_rank)
VALUES('testid','1234','test@gmail.com',2,'2021-12-16', '김이름',0);

INSERT INTO tbl_room(user_id, room_name, room_total, room_introduce)
VALUES('testid','김이름 님의 미니홈피에 오신 걸 환영합니다',0,"소개글이 없습니다");