package com.minhellic.stepX.dao.test;

import org.springframework.stereotype.Repository;

import com.minhellic.stepX.dao.common.CommonDaoImpl;
import com.minhellic.stepX.domain.TestTable;

@Repository("testDao")
public class TestDaoImpl extends CommonDaoImpl<TestTable> implements TestDao {

}
