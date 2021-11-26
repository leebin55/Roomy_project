# application.yml 에서 JPA DDL 설정 :   
  create, update, create-drop, validate, none 이 있다
* create : 기존의 table 을 삭제하고 다시 생성하기
* update : 기존 table 구조를 분석하여 변경사항을 alter table
* create-drop : 기존 table 을 삭제하고 다시 생성하고 프로젝트를 종료하면 table 을 drop
* validate : Entity 칼럼의 설정값과 실제 table 의 구조가 다르면  
  프로젝트 실행 멈춤
* none : 아무것도 실행하지 않음
* 개발당시 : create, update 를 설정
* 자동화된 test 를 진행할때 : create-drop 를 설정
* 수동 test : update, validate 를 설정
* 실제 실행 서버 : validate 또는 none


# DB 사용자 생성
CREATE DATABASE roomyDB; -- db 생성
CREATE USER roomy@localhost; -- 사용자 생성
GRANT all privileges on  *.* TO roomy@localhost; -- 권한부여
ALTER USER 'roomy'@'localhost' identified WITH mysql_native_password BY 'roomy1234';
