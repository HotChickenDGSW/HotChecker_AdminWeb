package kr.hs.dgsw.hotchecker.admin.Controller;

import kr.hs.dgsw.hotchecker.admin.Domain.Card;
import kr.hs.dgsw.hotchecker.admin.Service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CardController {
    @Autowired
    CardService cardService;

    @GetMapping(value = "/api/card")
    public List<Card> findAll(){
        return cardService.findAll();
    }
}
