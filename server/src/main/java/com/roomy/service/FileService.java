package com.roomy.service;

import com.roomy.model.BoardImageVO;
import com.roomy.model.BoardVO;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

public interface FileService {

    public String uploadFile(MultipartFile file);

    public List<String> uploadMultiFiles(MultipartHttpServletRequest files);

    List<BoardVO> selectAllWithImage(List<BoardVO> boardList);

    public Resource loadFileAsResource(String fileName);

    void insert(BoardImageVO imageVO);
}
