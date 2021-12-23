package com.roomy.service;

import com.roomy.model.GuestVO;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GuestService extends GenericService<GuestVO, Long> {
    List<GuestVO> mainList(String userId);
    List<GuestVO> allList(String userId);
    String findWriter(Long guestSeq);
}