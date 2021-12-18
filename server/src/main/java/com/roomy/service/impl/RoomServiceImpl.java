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

}

