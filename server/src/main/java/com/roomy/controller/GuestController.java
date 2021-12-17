package com.roomy.controller;

import com.roomy.model.GuestVO;
import com.roomy.service.GuestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
    public List<GuestVO> list(@RequestParam(name = "limit",required = false,defaultValue = "0") Long limit) {
        // 미니홈피 main 화면에서 방명록 최근 4개 보여주기 위해 이렇게 설정
        log.debug("guest list 컨트롤러 실행");
        List<GuestVO> guestList = null;
        if(limit == 0) {
            guestList = guestService.selectAll();
        } else  {
             guestList = guestService.mainList();
        }
        return guestList;
    }

    @PostMapping("/{userId}/guest")
    public void insert(@RequestBody GuestVO guestVO) {
        log.debug("insert 컨트롤러 실행");
        log.debug(guestVO.toString());
        guestService.insert(guestVO);
    }

    @PutMapping("/{userId}/guest/{guestSeq}")
    public void update(@PathVariable Long guestSeq, @RequestBody GuestVO vo) {
        log.debug("update 컨트롤러 실행");
        GuestVO guestVO = guestService.findById(guestSeq);
        guestVO.setGuestContent(vo.getGuestContent());

        LocalDateTime localDateTime = LocalDateTime.now();
        String dateTime = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        guestVO.setGuestUpdateAt(dateTime);
        guestService.update(guestVO);
    }

    @DeleteMapping("/{userId}/guest/{guestSeq}")
    public void delete(@PathVariable Long guestSeq) {
        log.debug("delete 컨트롤러 실행", guestSeq);
        guestService.delete(guestSeq);
    }

}
