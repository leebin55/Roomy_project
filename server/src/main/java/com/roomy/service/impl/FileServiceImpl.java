package com.roomy.service.impl;

import com.roomy.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;


@Slf4j
@Service
public class FileServiceImpl implements FileService {

    //application.yml 파일에서 file.upload-dir: /uploads 를 가져오기
    @Value("${file.upload-dir}")
    private String fileLocation;

    //  받아온 이미지를 새로운 이름으로 만들어
    //  application.yml 에 지정한 위치에ㅔ 저장 후 이름 리턴
    // c:/bizwork/uploads
    // /uploads를 하면 로컬디스크에 폴더가 생성되기는 하지만 저장실패(아마 접근을 못해서
    // 오류가 난다.)
    @Override
    public String uploadFile(MultipartFile file) {
        log.debug("fileLocation : {}" ,fileLocation);
        if(file == null){
            return null;
        }
        // 업로드할 폴더 검사
        File dir = new File(fileLocation);

        //업로드할 폴더가 없으면
        if(!dir.exists()){
            //폴더 생성
            log.debug("파일 경로 없음");
            dir.mkdirs();
        }

        String strUUID = UUID.randomUUID().toString();

        //원본파일에서 이름 추출
        String originalFileName = file.getOriginalFilename();

        // UUID와 파일이름을 합쳐 새로운 이름 만들기
        String newFileName = String.format("%s-%s",strUUID,originalFileName);

        // 저장할 폴더와 파일이름을 매개변수로 전달하여
        // 파일을 저장하기 위해 File객체 생성
        File uploadFile = new File(fileLocation,newFileName);
        try{
            file.transferTo(uploadFile);
        }catch (IllegalStateException | IOException e)  {
            log.debug("파일을 저장할 수 없음....");
            return "store_fail";
            //e.printStackTrace();
        }
        return newFileName;
    }

    @Override
    public List<String> uploadMultiFiles(MultipartHttpServletRequest files) {

        return null;
    }

    @Override
    public Resource loadFileAsResource(String fileName) {
        return null;
    }
}
