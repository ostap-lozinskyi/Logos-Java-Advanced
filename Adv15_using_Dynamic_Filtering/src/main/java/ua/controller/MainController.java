package ua.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import ua.entity.User;
import ua.model.filter.MealFilter;
import ua.service.MealViewService;

@Controller
public class MainController {
	
	private final MealViewService service;

	@Autowired
	public MainController(MealViewService service) {
		this.service = service;
	}

	@GetMapping("/")
	public String index(Model model, Principal principal, As as, @ModelAttribute("mealFilter") MealFilter filter, @PageableDefault Pageable pageable) {
		if(principal!=null) {
			model.addAttribute("message", "Hello "+principal.getName());
		} else {
			model.addAttribute("message", "Hello unregistered user");
		}
		System.out.println(as.getUser());
		model.addAttribute("meals", service.findAll(filter, pageable));
		return "index";
	}

	@GetMapping("/admin")
	public String admin() {
		return "admin";
	}
	
	static class As{
		
		private User user;

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}
	}
}
