package ua.controller;

import java.math.BigDecimal;

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
public class MealMenuController {
	
	private final MealService service;
	
	public MealMenuController(MealService service) {
		this.service=service;
	}
	
	@ModelAttribute("mealFilter")
	public MealFilter getFilter() {
		return new MealFilter();
	}

	@GetMapping("/mealMenu")
	public String mealMenu(Model model, @ModelAttribute("mealFilter") MealFilter filter, @PageableDefault Pageable pageable) {
		model.addAttribute("meals", service.findAll(filter, pageable));
		model.addAttribute("cuisines", service.findAllcuisines());
		return "mealMenu";
	}	
	
	@PostMapping("/mealMenu/{id}")
	public String updateRate(@PathVariable Integer id, Model model,	@RequestParam Integer rate) {
		service.updateRate(id, rate);
		return "redirect:/mealMenu";
	}
	
}