package com.roomy.service.impl;

import com.roomy.model.BoardImageVO;
import com.roomy.model.BoardVO;
import com.roomy.repository.FileRepository;
import com.roomy.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;


@Slf4j
@Service
public class FileServiceImpl implements FileService {


    private final FileRepository fileRepository;

    public FileServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

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

    public void insertImages (List<String> imgURLs,Long board_seq){
        for(String image:imgURLs){
            BoardImageVO imageVO = new BoardImageVO();
            imageVO.setImgUrl(image);
            imageVO.setImgBoardSeq(board_seq);
            fileRepository.save(imageVO);
        }
    }
    @Override
    public List<BoardVO> selectAllWithImage(List<BoardVO> boardList){
        // 새로운 리스트를 생성 => tbl_board 에는 이미지에 관한 정보가 없기 때문에
        List<BoardVO> boardWithImgList = new ArrayList<>();
        for(BoardVO board:boardList){
            // board_seq 를 뽑아와서
            Long board_seq =board.getBoardSeq();
            // 해당 개시물에 있는 image 를 tbl_board_image 테이블에서 imgURL들을 받아온다
            List<String>imgURL=fileRepository.findByImgBoardSeq(board_seq);
            // 이미지는 하나만 보여줄 거기 때문에 맨 처음 하나만  board 객체에 담음
            board.setImgURL(Collections.singletonList(imgURL.get(0)));
            // 리스트에 넣어줌
            boardWithImgList.add(board);
        }
        //새로만든 리스트 리턴
        return boardWithImgList;
    }

    @Override
    public Resource loadFileAsResource(String fileName) {
        return null;
    }

    @Override
    public void insert(BoardImageVO imageVO) {
        fileRepository.save(imageVO);
    }
}


