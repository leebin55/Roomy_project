package com.roomy.service.impl;

import com.roomy.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

@Service
public class FileServiceImpl implements FileService {

//    private final Path fileLocation;
//
//    public FileServiceImpl(Path fileLocation) {
//        this.fileLocation = fileLocation;
//    }

    @Override
    public String saveFile(MultipartFile file) {
        return null;
    }

    @Override
    public Resource loadFileAsResource(String fileName) {
        return null;
    }
}
