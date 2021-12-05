package com.roomy.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    public String saveFile(MultipartFile file);

    public Resource loadFileAsResource(String fileName);

}
