package com.roomy.service;

import java.util.List;

public interface GenericService <VO, PK>{

    public List<VO> selectAll();
    public VO findById(PK pk);

    public void insert(VO vo);
    public void update(VO vo);
    public void delete(PK pk);

}