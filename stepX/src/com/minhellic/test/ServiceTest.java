package com.minhellic.test;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.minhellic.stepX.domain.TestTable;
import com.minhellic.stepX.service.test.TestService;

public class ServiceTest {
	
	TestService testService;
	
	@Before
	public void init() {
		ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
		testService = (TestService) ac.getBean("testService");
	}
	
	@Test
	public void test_save() {
		TestTable tt = new TestTable("第三个", "这是测试service");
		this.testService.saveTest(tt);
	}
}
