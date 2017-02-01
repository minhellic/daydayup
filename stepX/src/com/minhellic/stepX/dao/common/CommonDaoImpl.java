package com.minhellic.stepX.dao.common;

import java.io.Serializable;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.minhellic.stepX.utils.TUtil;

public class CommonDaoImpl<T> extends HibernateDaoSupport implements CommonDao<T> {
	
	/**
	 * 当前类的范型T传递的类型参数
	 */
	Class entityClass = TUtil.getActualClass(this.getClass());
	
	@Resource(name = "sessionFactory")
	public void setFactory(SessionFactory sessionFactory) {
		this.setSessionFactory(sessionFactory);
	}
	
	/**
	 * 添加
	 */
	@Override
	public void save(T entity) {
		this.getHibernateTemplate().save(entity);
	}
	
	/**
	 * 更新
	 */
	@Override
	public void update(T entity) {
		this.getHibernateTemplate().update(entity);
	}
	
	/**
	 * 删除
	 */
	@Override
	public void delete(T entity) {
		this.getHibernateTemplate().delete(entity);
	}

	/**
	 * 根据ID查找
	 */
	@Override
	public T getByID(Serializable id) {
		return (T)this.getHibernateTemplate().get(entityClass, id);
	}
}
