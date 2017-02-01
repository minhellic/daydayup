package com.minhellic.stepX.domain;

import java.io.Serializable;

public class TestTable implements Serializable {
	private static final long serialVersionUID = -2667906809457907369L;
	
	private String id;
	private String name;
	private String context;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContext() {
		return context;
	}
	public void setContext(String context) {
		this.context = context;
	}
	@Override
	public String toString() {
		return "Test [id=" + id + ", name=" + name + ", context=" + context + "]";
	}
	public TestTable(String id, String name, String context) {
		super();
		this.id = id;
		this.name = name;
		this.context = context;
	}
	public TestTable(String name, String context) {
		super();
		this.name = name;
		this.context = context;
	}
	public TestTable() {
		super();
	}
	
}
