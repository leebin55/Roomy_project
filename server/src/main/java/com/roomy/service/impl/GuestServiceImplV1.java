package com.roomy.service.impl;

import com.roomy.model.GuestVO;
import com.roomy.repository.GuestRepository;
import com.roomy.service.GuestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service("guestService")
public class GuestServiceImplV1 implements GuestService {

    private final GuestRepository guestRepository;

    public GuestServiceImplV1(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    @Override
    public List<GuestVO> selectAll() {
        List<GuestVO> guestList = guestRepository.findAll();

        return guestList;
    }

    @Override
    public GuestVO findById(Long guest_seq) {
        GuestVO guestVO = guestRepository.findById(guest_seq).orElse(null);
        return guestVO;
    }

    @Override
    public void insert(GuestVO guestVO) {

        LocalDateTime localDateTime = LocalDateTime.now();
        String dateTime = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        GuestVO vo = GuestVO.builder()
                .guest_writer_name("서녕")
                .guest_create_at(dateTime)
                .guest_update_at(dateTime)
                .guest_private(guestVO.getGuest_private())
                .guest_content(guestVO.getGuest_content())
                .user_seq2(1L)
                .guest_writer_seq(1L)
                .build();
        log.debug(vo.toString());
        guestRepository.save(vo);
    }

    @Override
    public void update(GuestVO vo) {
        guestRepository.save(vo);
    }

    @Override
    public void delete(Long guest_seq) {
        guestRepository.deleteById(guest_seq);
    }
}
