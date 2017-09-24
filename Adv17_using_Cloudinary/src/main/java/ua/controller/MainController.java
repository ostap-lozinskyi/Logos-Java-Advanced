package ua.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import ua.entity.User;
import ua.service.MealService;

@Controller
public class MainController {
	
	private final MealService service;

	@Autowired
	public MainController(MealService service) {
		this.service = service;
	}

	@GetMapping("/")
	public String index(Model model, Principal principal, As as) {
		if(principal!=null) {
			model.addAttribute("message", "Hello "+principal.getName());
		} else {
			model.addAttribute("message", "Hello unregistered user");
		}
		System.out.println(as.getUser());
		model.addAttribute("meals", service.find5MealsByRate());
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
