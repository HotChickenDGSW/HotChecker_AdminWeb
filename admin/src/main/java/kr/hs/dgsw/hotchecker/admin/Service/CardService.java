package kr.hs.dgsw.hotchecker.admin.Service;

import kr.hs.dgsw.hotchecker.admin.Domain.Card;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CardService {
    List<Card> findAll();
    Card findById(String cardId);
}
