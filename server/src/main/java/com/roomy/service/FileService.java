package com.roomy.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

public interface FileService {

    public String uploadFile(MultipartFile file);

    public List<String> uploadMultiFiles(MultipartHttpServletRequest files);

    public Resource loadFileAsResource(String fileName);

}
