package com.roomy.controller;

import com.roomy.dto.SessionDTO;
import com.roomy.model.BoardVO;
import com.roomy.model.LikeVO;
import com.roomy.model.UserVO;
import com.roomy.service.BoardService;
import com.roomy.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/room")
public class BoardController {

    @Qualifier("boardService")
    private final BoardService boardService;

    private final LikeService likeService;

    public BoardController(BoardService boardService, LikeService likeService) {
        this.boardService = boardService;
        this.likeService = likeService;
    }

    @GetMapping("/{userId}/board")
    public List<BoardVO> list(@PathVariable String userId) {
        log.debug("board list 컨트롤러 실행 {}", userId);
        List<BoardVO> boardList = boardService.readBoardList(userId);
        log.debug(boardList.toString());
        return boardList;
    }

    // 페이지네이션 하다 멈춤
//    @GetMapping({"/",""})
//    public Page<BoardVO> list(Pageable pageable) {

//        log.debug("board list 컨트롤러 실행");
//        Page<BoardVO> borderPages = boardService.selectAll(pageable);
//        log.debug(borderPages.toString());
//        return borderPages;
//    }

    @PostMapping("/{userId}/board")
    public String insert(HttpSession session, @PathVariable String userId, @RequestBody BoardVO boardVO) {
        log.debug("board write 컨트롤러 실행 {}", boardVO.toString());

        // 미니홈피 주인회원만 글을 쓸 수 있도록
        // 현재 접속중인 회원과 미니홈피 주인회원이 일치하는지 확인
        // <<수정필요>> 일치하지 않으면 어떻게 처리할 것인지
        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");

        // 세션에 user 가 없으면
        if(sessionDTO == null) {
            log.debug("세션에 user 없음");
            return "로그인이 필요합니다";
        }
        if(!(sessionDTO.getUserId().equals(userId))) {
            log.debug("회원불일치 세션은 {} url은 {}", sessionDTO.getUserId(), userId);
            return "미니홈피 주인만 글을 쓸 수 있습니다";
        }
        boardVO.setBoardUserId(sessionDTO.getUserId());
        boardService.insert(boardVO);
        return "OK";
    }

    // 글 상세보기라 GET 이지만 session 을 넘겨받아야 하기 때문에 Post
    @PostMapping("/{userId}/board/{board_seq}")
    public BoardVO detail(@PathVariable Long board_seq, HttpSession session) {
        log.debug("board detail 컨트롤러 실행 {}",board_seq);
        BoardVO boardVO = boardService.findById(board_seq);

        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");

        // 좋아요 눌렀는지 여부 확인 위해 likeVO 생성하고 게시물번호, 유저번호 넣어줌
        LikeVO likeVO = new LikeVO();
        likeVO.setBoardSeq(board_seq);
        likeVO.setUserId(sessionDTO.getUserId());

        Boolean check = likeService.likeCheck(likeVO);

        boardVO.setCheckLike(check);

        log.debug(boardVO.toString());
        return boardVO;
    }

    @PutMapping("/{userId}/board")
    public void update(@RequestBody BoardVO boardVO) {
        log.debug("board update 컨트롤러 실행 {}", boardVO.toString());
        boardService.update(boardVO);
    }

    @DeleteMapping("/{userId}/board/{board_seq}")
    public void delete(@PathVariable Long board_seq) {
        log.debug("board delete 컨트롤러 실행");
        boardService.delete(board_seq);
    }

    @GetMapping("/{userId}/board/{board_seq}/search")
    public List<BoardVO> search(@RequestParam String query, @RequestParam String select) {
        // select : select box 에서 제목, 제목+내용, 내용 중 뭘 선택했는지
        // query : 검색어
        log.debug("board search 컨트롤러 실행");
        List<BoardVO> list = boardService.search(select,query);
        return list;
    }

    @PostMapping("/{userId}/board/{board_seq}/like")
    public int like(HttpSession session, @RequestBody LikeVO likeVO) {
        log.debug("board like 컨트롤러 실행 {}", likeVO);

        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");

        likeVO.setUserId(sessionDTO.getUserId());
        int likeNum = likeService.insertOrDelete(likeVO);
        return likeNum;
    }
}
