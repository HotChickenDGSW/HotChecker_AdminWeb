package kr.hs.dgsw.hotchecker.admin.Domain;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CardMapper {
    List<Card> findAll();
}
