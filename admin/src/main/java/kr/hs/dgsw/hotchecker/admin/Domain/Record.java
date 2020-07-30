package kr.hs.dgsw.hotchecker.admin.Domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Record {
    private int Idx;
    private int studentId; //insert
    private LocalDateTime recordTime;
    private int recordCode; //insert
    private float temp; //insert
}
