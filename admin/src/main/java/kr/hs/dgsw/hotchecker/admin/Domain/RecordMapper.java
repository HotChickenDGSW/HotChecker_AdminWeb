package kr.hs.dgsw.hotchecker.admin.Domain;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RecordMapper {
    int add(Record record);
}
