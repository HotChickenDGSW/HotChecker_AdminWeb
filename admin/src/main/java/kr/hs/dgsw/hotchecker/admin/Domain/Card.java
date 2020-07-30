package kr.hs.dgsw.hotchecker.admin.Domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Card {
    private int idx;
    private int grade;
    private int classNum;
    private int number;
    private String name;
    private int student;
    private String cardId;
}
