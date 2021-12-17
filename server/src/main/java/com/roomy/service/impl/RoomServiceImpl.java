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
    public List<RoomVO> selectAll() {
        return roomRepository.findAll();
    }

    @Override
    public RoomVO findById(String userSeq) {
        return roomRepository.findById(userSeq).get();
    }

    // 회원 가입을 하면 자동으로 룸도 생성되게
    @Override
    public void insert(RoomVO roomVO) {
        roomRepository.save(roomVO);
    }

    @Override
    public void update(RoomVO roomVO) {
        roomRepository.save(roomVO);
    }

    // 회원 탈퇴하면 같이 삭제
    @Override
    public void delete(String aLong) {

    }
}
