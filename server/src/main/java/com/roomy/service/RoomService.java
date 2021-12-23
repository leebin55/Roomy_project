package com.roomy.service;

import com.roomy.model.RoomVO;

import java.util.List;

public interface RoomService{

    RoomVO findById(String userId);
    void update(RoomVO roomVO);
    List<RoomVO> search (String select, String query);
}