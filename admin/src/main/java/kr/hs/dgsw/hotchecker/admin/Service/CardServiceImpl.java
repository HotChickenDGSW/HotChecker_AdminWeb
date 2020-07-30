package kr.hs.dgsw.hotchecker.admin.Service;

import kr.hs.dgsw.hotchecker.admin.Domain.Card;
import kr.hs.dgsw.hotchecker.admin.Domain.CardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServiceImpl implements CardService{
    @Autowired
    CardMapper cardMapper;

    @Override
    public List<Card> findAll() {
        return cardMapper.findAll();
    }

    @Override
    public Card findById(String cardId) {
        return cardMapper.findById(cardId);
    }
}
