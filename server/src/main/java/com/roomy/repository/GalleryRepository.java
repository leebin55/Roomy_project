package com.roomy.repository;

import com.roomy.model.BoardVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface GalleryRepository extends JpaRepository<BoardVO,Long> {

}
