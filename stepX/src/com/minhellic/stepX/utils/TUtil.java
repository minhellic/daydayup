package com.minhellic.stepX.utils;

import java.lang.reflect.ParameterizedType;

public class TUtil {
	/**
	 * T型转换，获取范型中传入的类型参数
	 * @param entity
	 * @return
	 */
	public static Class getActualClass(Class entity) {
		ParameterizedType parameterizedType = (ParameterizedType) entity.getGenericSuperclass();
		return (Class) parameterizedType.getActualTypeArguments()[0];
	}
}
