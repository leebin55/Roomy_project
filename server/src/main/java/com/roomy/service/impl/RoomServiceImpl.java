package com.roomy.service.impl;

import com.roomy.model.RoomVO;
import com.roomy.repository.RoomRepository;
import com.roomy.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }


    @Override
    public RoomVO findById(String userId) {
        return roomRepository.findById(userId).orElse(null);
    }

    @Override
    public void update(RoomVO roomVO) {
        roomRepository.save(roomVO);
        return;
    }

    @Override
    public List<RoomVO> search(String select, String query) {
        List<RoomVO> list = null;

        if(select.equals("0")) { // 미니홈피명으로 검색
            list = roomRepository.findByRoomName(query);
        } else if(select.equals("1")) { // 회원이름으로 검색

//            list = roomRepository.findByUserName(query);
        }
        return list;
    }

}

