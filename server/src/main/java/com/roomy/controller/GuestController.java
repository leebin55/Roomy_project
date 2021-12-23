package com.roomy.controller;

import com.roomy.dto.SessionDTO;
import com.roomy.model.GuestVO;
import com.roomy.service.GuestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/room")
public class GuestController {

    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping("/{userId}/guest")
    public List<GuestVO> list(@PathVariable String userId, @RequestParam(name = "limit",required = false,defaultValue = "0") Long limit) {
        // 미니홈피 main 화면에서 방명록 최근 4개 보여주기 위해 이렇게 설정
        // 방명록 메인에서 호출되는 거면 limit에 4 넣어오고, 방명록 게시판에서 호출되는 거면 0
        log.debug("guest list 컨트롤러 실행");

        List<GuestVO> guestList = null;
        if(limit == 0) {
            guestList = guestService.allList(userId);
        } else  {
             guestList = guestService.mainList(userId);
        }
        log.debug("메인 방명록 리스트 {}", guestList.toArray());
        return guestList;
    }

    @PostMapping("/{userId}/guest")
    public void insert(HttpSession session, @PathVariable String userId, @RequestBody GuestVO guestVO) {
        log.debug("방명록 insert 컨트롤러 실행 {}", guestVO.toString());

        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");

        // 로그인이 안 된 상태라면
        if (sessionDTO == null) {
            log.debug("방명록 insert 로그인 안 돼있음");
            return;
        }
        
        guestVO.setUserId(userId);
        guestVO.setGuestWriterId(sessionDTO.getUserId());
        guestVO.setGuestWriterName(sessionDTO.getUserName());
        guestService.insert(guestVO);
    }

    @PutMapping("/{userId}/guest/{guestSeq}")
    public void update(HttpSession session, @PathVariable Long guestSeq, @RequestBody GuestVO vo) {
        log.debug("update 컨트롤러 실행");

        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");

        GuestVO guestVO = guestService.findById(guestSeq);

        // 본인만 수정할 수 있도록
        String writerId = guestService.findWriter(guestSeq);
        // 로그인 된 상태인지 확인
        if(sessionDTO == null) {
            log.debug("로그인 안 돼있음");
            return;
        }
        // 현재 접속중인 회원 id와 방명록 쓴 회원 id 같은 지 확인
        if(!guestVO.getGuestWriterId().equals(sessionDTO.getUserId())) {
            log.debug("방명록 수정 userId 다름");
            return;
        }

        guestVO.setGuestContent(vo.getGuestContent());

        guestService.update(guestVO);
    }

    @DeleteMapping("/{userId}/guest/{guestSeq}")
    public void delete(HttpSession session, @PathVariable Long guestSeq) {
        log.debug("delete 컨트롤러 실행", guestSeq);

        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");

        GuestVO guestVO = guestService.findById(guestSeq);

        // 로그인 된 상태인지 확인
        if(sessionDTO == null) {
            log.debug("로그인 안 돼있음");
            return;
        }
        // 현재 접속중인 회원 id와 방명록 쓴 회원 id 같은 지 확인
        if(!sessionDTO.getUserId().equals(guestVO.getGuestWriterId())) {
            log.debug("방명록 삭제 userId 다름");
            return;
        }

        guestService.delete(guestSeq);

    }

}
