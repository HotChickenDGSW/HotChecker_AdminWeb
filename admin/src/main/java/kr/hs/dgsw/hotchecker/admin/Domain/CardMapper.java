package kr.hs.dgsw.hotchecker.admin.Domain;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CardMapper {
    List<Card> findAll();
    Card findById(@Param("cardId") String cardId);
}
