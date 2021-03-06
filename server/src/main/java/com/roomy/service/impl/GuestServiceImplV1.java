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
    public List<GuestVO> allList(String userId) {
        List<GuestVO> guestList = guestRepository.findAllByUserIdOrderByGuestSeqDesc(userId);

        return guestList;
    }

    // 방명록 쓴 사람의 id 찾기 (필요없을듯)
    @Override
    public String findWriter(Long guestSeq) {
        String writerId = guestRepository.findGuestWriterIdByGuestSeq(guestSeq);
        return writerId;
    }

    @Override
    public List<GuestVO> selectAll() {
        return null;
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

        guestVO.setGuestCreateAt(dateTime);
        guestVO.setGuestUpdateAt(dateTime);

        log.debug(guestVO.toString());
        guestRepository.save(guestVO);
    }

    @Override
    public void update(GuestVO guestVO) {
        LocalDateTime localDateTime = LocalDateTime.now();
        String dateTime = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        guestVO.setGuestUpdateAt(dateTime);
        guestRepository.save(guestVO);
    }

    @Override
    public void delete(Long guestSeq) {
        guestRepository.deleteById(guestSeq);
    }

    @Override
    public List<GuestVO> mainList(String userId) {
        List<GuestVO> list = guestRepository.findTop4ByUserIdOrderByGuestSeqDesc(userId);
        return list;
    }
}
