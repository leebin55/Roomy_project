package com.roomy.controller;

import com.roomy.dto.SessionDTO;
import com.roomy.model.BoardVO;
import com.roomy.model.LikeVO;
import com.roomy.service.BoardService;
import com.roomy.service.FileService;
import com.roomy.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/room")
@RestController
public class GalleryController {

    private final FileService fileService;

    @Qualifier("galleryService") // Gallery 와 일반 게시판은 같은 galleryService interface  를 사용하기 때문에
    private final BoardService galleryService ;
    private final LikeService likeService;

    public GalleryController(FileService fileService, BoardService galleryService, LikeService likeService) {
        this.fileService = fileService;
        this.galleryService = galleryService;
        this.likeService = likeService;
    }

    // 메인페이지 피드에서 최근 10개 게시물 불러오기
    @GetMapping("/gallery")
    public List<BoardVO> feeds(){

        List<BoardVO> boardList = galleryService.selectAll();

      //  log.debug("feed all : {}",boardList.toString());
        return boardList;
    }

    // room 에서 갤러리 목록에 들어가면 갤러리 맨 처음 보여주는 리스트 return
    @GetMapping("/{userId}/gallery")
    public ResponseEntity<?> list(@PathVariable("userId") String userId){
        log.debug("userId : {}", userId);
        List<BoardVO> boardList = galleryService.readBoardList(userId);
        List<BoardVO> boardImgList= fileService.selectAllWithImage(boardList);
     //   log.debug("select all : {}",boardList.toString());
        return ResponseEntity.ok(boardImgList);
    }

    // 게시물 번호(seq)로 찾아 해당 게시물 return
    @GetMapping("/{userId}/gallery/detail")
    public ResponseEntity<?> detail(@PathVariable("userId") String userId,@RequestParam Long board_seq ){
        BoardVO boardVO = galleryService.findById(board_seq);
        if(boardVO == null){
            //400 오류
            return ResponseEntity.badRequest().body("해당 게시물이 존재하지 않습니다.");
        }
        // 해당 게시물 클릭 할 때마다 board_hit +1 조회수 증가
        boardVO.setBoardHit(boardVO.getBoardHit()+1);
        log.debug("findbyId : {}" , boardVO.toString());
        return ResponseEntity.ok(boardVO);
    }



    // 갤러리 등록할 때 post 로  데이터 받아오고 ok를 넘겨줌
    //{userId}/gallery/write 에서 수정 > /{userId}/gallery  (url에 행위넣지 말기)
    // url은 똑같더라도 httpmethod : get post 가 다르기 때문에 url 겹쳐도 문제되지 않음
    @PostMapping("/{userId}/gallery")
    public  ResponseEntity<?> write(HttpSession session, @PathVariable("userId") String userId, @RequestBody  BoardVO boardVO ) {
        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");
        if(sessionDTO != null){
            log.debug("controller_boardVO : {}",boardVO.toString());
            galleryService.insert(boardVO);
            return ResponseEntity.ok(boardVO);
        }
        Map<String,String> msg = new HashMap<>();
        msg.put("message","게시판 글쓰기 권한이 없습니다.");
         return ResponseEntity.badRequest().body(msg);
    }

    // editor 에서 이미지를 등록하면 base64로 변경됨 그래서 url 로 바꿔줌
    // 글쓸때 똑같은 이미지를 등록하면 그대로 사용하기 위해 Put 사용
    @PutMapping("/{userId}/gallery/img")
    public ResponseEntity<?> img(@PathVariable("userId") String userId,@RequestParam("img") MultipartFile img){
      log.debug("받아온 파일 이름 {}",img.getOriginalFilename());
      String newFileName = fileService.uploadFile(img);
      log.debug("보낼 url {}:", newFileName);
        return ResponseEntity.ok(newFileName);
    }

    // 갤러리 게시글 수정
    @PutMapping("/{userId}/gallery/{boardSeq}")
    public ResponseEntity<?> update(@PathVariable("userId") String userId,@RequestBody BoardVO boardVO){

//        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");
//
//        if(sessionDTO != null ){
//            log.debug("update logged user : {}", sessionDTO.toString());
          //  String loggedUserId = sessionDTO.getUserId();
//            if(loggedUserId == userId){
                galleryService.insert(boardVO);
                return ResponseEntity.ok(boardVO.getBoardSeq());
//            }
//            return ResponseEntity.badRequest().body("해당 글의 수정권한이 없습니다.");
//        }
//        return ResponseEntity.badRequest().body("로그인을 해주세요");
    }

    //삭제
    // URL : /{userId}/gallery/delete/{board_seq} > REST 를 제대로 적용하지 않음
    //  url 은 자원을 표현하는데 중점 > delete 같은 행위에 대한 표현이 들어가는것은 맞지않다.
    @DeleteMapping("/{userId}/gallery/{board_seq}")
    public ResponseEntity<?> delete(@PathVariable("userId") String userId,@PathVariable("board_seq") Long board_seq){
//        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");
//        if(sessionDTO == null){
//            return ResponseEntity.badRequest().body("로그인을 해주세요");
//        }
//        String loggedUser = sessionDTO.getUserId();
//        if(loggedUser == userId){
                galleryService.delete(board_seq);
            return ResponseEntity.ok("board_seq");
//        }
//        return ResponseEntity.badRequest().body("삭제권한이 없습니다.");

    }

    //좋아요 클릭 할때 실행되는 method
    @PostMapping("/{userId}/gallery/like")
    public ResponseEntity<?> like(@PathVariable("userId") String userId,@RequestBody LikeVO likeVO){
//
//        SessionDTO sessionDTO= (SessionDTO) session.getAttribute("USER");
//        if(sessionDTO!=null){
//            log.debug("likeVO {} ",likeVO.toString());
            int likeNum = likeService.insertOrDelete(likeVO);
            return ResponseEntity.ok(likeNum);
//        }
//        //로그인 안되있을때
//        return ResponseEntity.badRequest().body("로그인을 먼저 해주세요");
    }


    // put > get 으로 변경 왜 put으로 썻는지 쏘리!!
    @GetMapping("/{userId}/gallery/beforeCheck")
    // gallery 리스트가 뜰때 좋아요를 이전에 눌렀는지 처음 한번만 확인하는 method
    public Boolean beforeLikeCheck(@PathVariable("userId") String userId, @RequestBody LikeVO likeVO){
            return likeService.likeCheck(likeVO);
    }

    @GetMapping("/{userId}/gallery/{board_seq}/search")
    public List<BoardVO> search(@RequestParam String query, @RequestParam String select) {
        // select : select box 에서 제목, 제목+내용, 내용 중 뭘 선택했는지
        // query : 검색어
        List<BoardVO> list = galleryService.search(select,query);
        log.debug("gallery search 컨트롤러 실행 : {}",list.toString());
        return list;
    }


    //댓글

}

// 쿠키를 사용하지 못하는 이유 :  client 와 server 가 분리되었기 때문에 cookie 는
// 클라이언트 로컬에 저장함
// 해당 쿠키가 존재하는지 검사하는 메서드
//    public boolean checkCookie(HttpServletRequest request) {
//        // 모든 쿠키를 다 가지고 옴
//        Cookie[] cookies = null; // 쿠키가 하나도 없으면 null 반환 > NullPointerException 발생
//        try {
//            cookies = request.getCookies();
//            log.debug("allcookie : {}",cookies.toString());
//            //cookies가 하나라도 있으면
//            if (cookies.length>0) {
//                for (Cookie cookie : cookies) {
//                    if (cookie.getName().equals("")) {
//                        log.debug("이미 조회한 게시물입니다.");
//                        return false; // 해당 쿠키 찾으면 return
//                    }
//                }
//                return true;
//            }
//        }catch (NullPointerException e){
//            return true;
//        }
//        return true;
//    }
//
//        /** cookie를 이용해서 새로고침 할때나 시간이 얼마 지나지 않았을 때 조회수 올라가는 것 방지*/
//        boolean findCookie =checkCookie(request);
//
//        if(findCookie == true){ // 해당 쿠키존재하지 않음
//            //쿠키 key , value 형식 key 에는 쿠키 이름(detail+게시물번호)  , value에는 유저 아이디 가 들어감
//            Cookie newCookie = new Cookie("detail"+board_seq,"1");
//            log.debug("cookie {}", newCookie.getName(),newCookie.getValue());
//            newCookie.setPath("/");
//            newCookie.setMaxAge(60*60);//초단위
//            response.addCookie(newCookie);
//
//    }