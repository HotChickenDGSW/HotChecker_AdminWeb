package kr.hs.dgsw.hotchecker.admin.Controller;

import kr.hs.dgsw.hotchecker.admin.Domain.Card;
import kr.hs.dgsw.hotchecker.admin.Domain.Record;
import kr.hs.dgsw.hotchecker.admin.Service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RecordController {
    @Autowired
    RecordService recordService;

    @PostMapping(value = "/api/record")
    public int add(@RequestBody Record record){
        return recordService.add(record);
    }

}
