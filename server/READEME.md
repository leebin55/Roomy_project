# application.yml 에서 JPA DDL 설정 : 
- create, update, create-drop, validate, none 이 있다
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


authentication 인증 
authorization 권한 

---
# Cache
- 리소스 파일등의 임시 저장소
- 데이터가 바뀌지 않고 이전에 사용되었던 데이터 사용가능성이 높을 때 사용
- 쉽게 말해 DB 에 요청이 계속 가지 않게 
- 데이터가 자주 바뀌지 않는 곳에서 db조회를 계속하면 성능이 떨어지므로 
  - buffer 와의 차이 : buffer는 속도 차이나는 엔티티 중간에 임시 저장소
  @Cacheable: 캐시 채우기를 트리거
  @CacheEvict: 캐시 제거를 트리거
  @CachePut: 메소드 실행을 방해하지 않고 캐시 업데이트
  @Caching: 메소드에 적용 할 여러 캐시 조작을 재 그룹화
  @CacheConfig: 클래스 수준에서 몇 가지 일반적인 캐시 관련 설정을 공유

# Cookie 
- client 로컬에 저장되는 키와 값이 들어있는 작은 데이터파일 ( 저장위치 : 클라이언트 )
- 만료 시간 지정가능, 브라우저 종류 후에도 만료 시간전이면 유지
- 보안에 취약
- ex ) 일정시간 자동 로그인 유지 및 팝업 보지 않기 등등

# Session 
- 서버에 저장되는 일종의 쿠키
- 클라이언트와 서버의 통신 상태
- 서버의 저장소에 저장
- 브라우저 종료시 삭제 
- ex) 로그인

---