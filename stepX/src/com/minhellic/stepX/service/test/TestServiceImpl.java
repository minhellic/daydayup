package com.minhellic.stepX.service.test;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.minhellic.stepX.dao.test.TestDao;
import com.minhellic.stepX.domain.TestTable;

@Service("testService")
public class TestServiceImpl implements TestService {
	@Resource(name = "testDao")
	private TestDao testDao;

	@Override
	public void saveTest(TestTable tt) {
		this.testDao.save(tt);
	}
	
	
}
