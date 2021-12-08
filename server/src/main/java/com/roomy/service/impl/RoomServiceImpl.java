package com.roomy.service.impl;


import com.roomy.model.RoomVO;
import com.roomy.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class RoomServiceImpl implements RoomService {
    @Override
    public List<RoomVO> selectAll() {
        return null;
    }

    @Override
    public RoomVO findById(Long aLong) {
        return null;
    }

    // 회원 가입을 하면 자동으로 룸도 생성되게
    @Override
    public void insert(RoomVO roomVO) {

    }

    @Override
    public void update(RoomVO roomVO) {

    }

    @Override
    public void delete(Long aLong) {

    }
}
