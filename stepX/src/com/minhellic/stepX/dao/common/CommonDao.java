package com.minhellic.stepX.dao.common;

import java.io.Serializable;

public interface CommonDao<T> {
	/**
	 * 添加
	 * @param entity
	 */
	public void save(T entity);
	
	/**
	 * 更新
	 * @param entity
	 */
	public void update(T entity);
	
	/**
	 * 删除
	 * @param entity
	 */
	public void delete(T entity);
	
	/**
	 * 根据ID查找
	 * @param id
	 * @return
	 */
	public T getByID(Serializable id);
	
}
