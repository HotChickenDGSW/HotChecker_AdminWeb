package kr.hs.dgsw.hotchecker.admin.Service;

import kr.hs.dgsw.hotchecker.admin.Domain.Record;
import kr.hs.dgsw.hotchecker.admin.Domain.RecordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecordServiceImpl implements RecordService{
    @Autowired
    RecordMapper recordMapper;

    @Override
    public int add(Record record) {
        return recordMapper.add(record);
    }
}
