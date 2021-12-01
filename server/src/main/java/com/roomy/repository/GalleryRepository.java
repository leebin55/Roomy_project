package com.roomy.repository;

import com.roomy.model.BoardVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GalleryRepository extends JpaRepository<BoardVO,Long> {

}
