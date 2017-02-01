package com.minhellic.test;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.minhellic.stepX.dao.test.TestDao;
import com.minhellic.stepX.domain.TestTable;

public class DaoTest {
	
	TestDao testDao;
	
	@Before
	public void init() {
		ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
		testDao = (TestDao) ac.getBean("testDao");
	}
	
	@Test
	public void test_save() {
		TestTable tt = new TestTable("第二个", "这里是第二个的备注");
		testDao.save(tt);
	}
	
	@Test
	public void test_update() {
		TestTable tt = new TestTable("4028818959f997730159f9977bbd0001", "第一个", "这个是修改过后的备注");
		testDao.update(tt);
	}
	
	@Test
	public void test_getById() {
		TestTable tt = testDao.getByID("4028818959f997730159f9977bbd0001");
		System.out.println(tt);
	}

}
