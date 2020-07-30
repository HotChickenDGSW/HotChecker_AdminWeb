package kr.hs.dgsw.hotchecker.admin.Service;

import kr.hs.dgsw.hotchecker.admin.Domain.Card;

import java.util.List;

public interface CardService {
    List<Card> findAll();
}
