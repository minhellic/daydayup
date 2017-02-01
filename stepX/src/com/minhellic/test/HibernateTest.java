package com.minhellic.test;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.minhellic.stepX.domain.TestTable;

public class HibernateTest {
	
	Session session;
	Transaction transaction;
	
	@Before
	public void init() {
		Configuration configuration = new Configuration();
		configuration.configure();
		SessionFactory sessionFactory = configuration.buildSessionFactory();
		session = sessionFactory.openSession();
		transaction = session.beginTransaction();
	}
	
	@After
	public void destroy() {
		transaction.commit();
		session.close();
	}
	
	@Test
	public void test_save() {
		TestTable tt = new TestTable("张三","喀吧若蕨类");
		session.save(tt);
	}
}
