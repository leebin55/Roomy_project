package com.roomy.service;

import com.roomy.model.BoardVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardService extends GenericService<BoardVO, Long> {

//    public Page<BoardVO> selectAll(Pageable pageable);
//      페이지네이션
    
    public List<BoardVO> search(String select, String query);

    public List<BoardVO> readBoardList (String userId);


}
