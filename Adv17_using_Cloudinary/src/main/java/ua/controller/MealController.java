package ua.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.model.filter.MealFilter;
import ua.service.MealService;

@Controller
public class MealController {
	
	private final MealService service;
	
	public MealController(MealService service) {
		this.service=service;
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
	public String updateRate(@PathVariable Integer id,	@RequestParam Integer rate) {
		service.updateRate(id, rate);
		return "redirect:/meal";
	}
	
}