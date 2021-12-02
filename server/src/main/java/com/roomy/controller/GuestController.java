package com.roomy.controller;

import com.roomy.model.GuestVO;
import com.roomy.service.GuestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
        log.debug(guestList.toString());
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
        log.debug("컨트롤러실행");
        log.debug(guestVO.toString());
        guestService.insert(guestVO);
    }

//    Json 파싱
//    @PostMapping(value={"/",""})
//    public void insert(@RequestBody String jsonGuest) {
//        log.debug("컨트롤러 실행됐다");
//        JsonObject
//        JSONObject obj = new JSONObject(jsonGuest);
//        JSONPObject
//
//        String guest_content = gContent.get("content");
//        Boolean guest_private = Boolean.valueOf(gContent.get("guest_private"));
//        log.debug(guest_content);
//        log.debug(String.valueOf(guest_private));
//        guestService.insert();
//    }

    @DeleteMapping(value = "/{guest_seq}")
    public void delete(@PathVariable Long guest_seq) {
        log.debug("delete 컨트롤러", guest_seq);
        guestService.delete(guest_seq);
    }

}
