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
@RequestMapping("/room/guest")
public class GuestController {

    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping(value = {"/", ""})
    public List<GuestVO> list() {
        log.debug("방명록 입장하심");
        List<GuestVO> guestList = guestService.selectAll();
        return guestList;
    }

//    Map 으로 받기
//    @PostMapping(value={"/",""})
//    public void insert(@RequestBody Map<String, String> gContent) {
//        log.debug("컨트롤러 실행됐다");
//        log.debug(String.valueOf(gContent));
////        log.debug(gContent.get("content"));
////        log.debug(gContent.get("guest_private"));
//        String guest_content = gContent.get("content");
//        Boolean guest_private = Boolean.valueOf(gContent.get("guest_private"));
//        log.debug(guest_content);
//        log.debug(String.valueOf(guest_private));
////        guestService.insert();
//    }

    // VO 로 받기
    @PostMapping(value = {"/", ""})
    public void insert(@RequestBody GuestVO guestVO) {
        log.debug("insert 컨트롤러 실행");
        log.debug(guestVO.toString());
        guestService.insert(guestVO);
    }

    @PutMapping(value="/{guest_seq}")
    public void update(@PathVariable  Long guest_seq, @RequestBody GuestVO vo) {
        log.debug("update 컨트롤러 실행");
        GuestVO guestVO = guestService.findById(guest_seq);
        guestVO.setGuest_content(vo.getGuest_content());

        LocalDateTime localDateTime = LocalDateTime.now();
        String dateTime = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        guestVO.setGuest_update_at(dateTime);
        guestService.update(guestVO);
    }

    @DeleteMapping(value = "/{guest_seq}")
    public void delete(@PathVariable Long guest_seq) {
        log.debug("delete 컨트롤러 실행", guest_seq);
        guestService.delete(guest_seq);
    }

}
