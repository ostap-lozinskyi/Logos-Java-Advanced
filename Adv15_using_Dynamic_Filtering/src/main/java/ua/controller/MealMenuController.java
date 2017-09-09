package ua.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import ua.model.filter.MealFilter;
import ua.repository.MealRepository;
import ua.repository.MealViewRepository;

@Controller
public class MealMenuController {
	
	private final MealViewRepository repository;
	
	private final MealRepository mealRepository;
	
	public MealMenuController(MealViewRepository repository, MealRepository mealRepository) {
		this.repository = repository;
		this.mealRepository = mealRepository;
	}
	
	@ModelAttribute("mealFilter")
	public MealFilter getFilter() {
		return new MealFilter();
	}

	@GetMapping("/mealMenu")
	public String mealMenu(Model model, @ModelAttribute("mealFilter") MealFilter filter, @PageableDefault Pageable pageable) {
		model.addAttribute("meals", repository.findAll(filter, pageable));
		model.addAttribute("cuisines", mealRepository.findAllCuisines());
		return "mealMenu";
	}	
	
	
}