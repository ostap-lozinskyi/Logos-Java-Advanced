package ua.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.entity.User;
import ua.model.filter.MealFilter;
import ua.service.MealService;
import ua.service.UserService;

@Controller
public class MealController {
	
	private final MealService service;
	
	private final UserService userService;
	
	public MealController(MealService service, UserService userService) {
		this.service = service;
		this.userService = userService;
	}
	
	@ModelAttribute("mealFilter")
	public MealFilter getFilter() {
		return new MealFilter();
	}

	@GetMapping("/meal")
	public String mealMenu(Model model, @ModelAttribute("mealFilter") MealFilter filter, 
			@PageableDefault Pageable pageable) {
		model.addAttribute("meals", service.findAll(filter, pageable));
		model.addAttribute("cuisines", service.findAllcuisines());
		return "meal";
	}	
	
	@PostMapping("/meal/{id}")
	public String updateRate(@PathVariable Integer id,	@RequestParam Integer rate, Principal principal) {
		User user = userService.findByEmail(principal.getName());
		List<Integer> userMealsId = service.findByUserId(user.getId());
		if (userMealsId.contains(id)) {
			service.updateRate(id, rate);
			System.out.println("updated");
		} else {
			System.out.println("not updated");
		}
		
		return "redirect:/meal";
	}
	
}