package com.roomy.service;

import com.roomy.model.BoardVO;

import java.util.List;

public interface BoardService extends GenericService<BoardVO, Long> {

    public List<BoardVO> search(String query);

}
