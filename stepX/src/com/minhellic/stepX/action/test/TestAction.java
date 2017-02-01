package com.minhellic.stepX.action.test;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.minhellic.stepX.action.common.CommonAction;
import com.minhellic.stepX.domain.TestTable;
import com.minhellic.stepX.service.test.TestService;

@Controller
public class TestAction extends CommonAction {
	@Resource
	private TestService testService;
	
	public String save() {
		String name = request.getParameter("name");
		String context = request.getParameter("context");
		TestTable tt = new TestTable(name, context);
		testService.saveTest(tt);
		return SUCCESS;
	}
}
