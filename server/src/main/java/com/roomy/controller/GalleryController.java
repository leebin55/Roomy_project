package com.roomy.controller;

import com.roomy.model.BoardVO;
import com.roomy.model.LikeVO;
import com.roomy.service.BoardService;
import com.roomy.service.FileService;
import com.roomy.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

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

        log.debug("feed all : {}",boardList.toString());
        return boardList;
    }

    // room 에서 갤러리 목록에 들어가면 갤러리 맨 처음 보여주는 리스트 return
    @GetMapping("/{userId}/gallery")
    public List<BoardVO> list(@PathVariable("userId") String userId){
        List<BoardVO> boardList = galleryService.readBoardList(userId);
        List<BoardVO> boardImgList= fileService.selectAllWithImage(boardList);
        log.debug("select all : {}",boardList.toString());
        return boardImgList;
    }

    // 게시물 번호(seq)로 찾아 해당 게시물 return
    @GetMapping("/{userId}/gallery/detail")
    public BoardVO detail(@PathVariable("userId") String userId,@RequestParam Long board_seq ){
        BoardVO boardVO = galleryService.findById(board_seq);
        // 해당 게시물 클릭 할 때마다 board_hit +1 조회수 증가
        boardVO.setBoardHit(boardVO.getBoardHit()+1);
        log.debug("findbyId : {}" , boardVO.toString());
        return boardVO;
    }



    // 갤러리 등록할 때 post 로  데이터 받아오고 ok를 넘겨줌
    @PostMapping("/{userId}/gallery/write")
    public String write(@PathVariable("userId") String userId,@RequestBody  BoardVO boardVO ) {
        log.debug("controller_boardVO : {}",boardVO.toString());
        galleryService.insert(boardVO);
        return "ok";

    }

    // editor 에서 이미지를 등록하면 base64로 변경됨 그래서 url 로 바꿔줌
    @PutMapping("/{userId}/gallery/img")
    public String img(@PathVariable("userId") String userId,@RequestParam("img") MultipartFile img){
      log.debug("받아온 파일 이름 {}",img.getOriginalFilename());
      String newFileName = fileService.uploadFile(img);
      log.debug("보낼 url {}:","http://localhost:8080/uploads/"+ newFileName);
        return "http://localhost:8080/uploads/"+ newFileName;
    }

    // 갤러리 게시글 수정
    @PutMapping("/{userId}/gallery/update")
    public void update(@PathVariable("userId") String userId,@RequestBody BoardVO boardVO){
        galleryService.insert(boardVO);

    }

    //삭제
    @GetMapping("/{userId}/gallery/delete/{board_seq}")
    public void delete(@PathVariable("userId") String userId,@PathVariable("board_seq") Long board_seq){
        galleryService.delete(board_seq);

    }

    //좋아요 클릭 할때 실행되는 method
    @PostMapping("/{userId}/gallery/like")
    public int like(@PathVariable("userId") String userId,@RequestBody LikeVO likeVO){
        log.debug("likeVO {} ",likeVO.toString());
        int likeNum = likeService.insertOrDelete(likeVO);

        return likeNum;
    }


    @PutMapping("/{userId}/gallery/beforeCheck")
    // gallery 리스트가 뜰때 좋아요를 이전에 눌렀는지 처음 한번만 확인하는 method
    public Boolean beforeLikeCheck(@PathVariable("userId") String userId, @RequestBody LikeVO likeVO){
        return likeService.likeCheck(likeVO);

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