package com.roomy.service.impl;

import com.roomy.model.GuestVO;
import com.roomy.repository.GuestRepository;
import com.roomy.service.GuestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service("guServiceV1")
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
    public GuestVO findById(Long pk) {
        return null;
    }

    @Override
    public void insert(GuestVO guestVO) {
        GuestVO vo = GuestVO.builder().guest_content(guestVO.getGuest_content()).guest_private(guestVO.getGuest_private()).guest_writer(1L).build();
        log.debug(vo.toString());
        guestRepository.save(vo);
    }

    @Override
    public void update(GuestVO vo) {

    }

    @Override
    public void delete(Long pk) {

    }
}
