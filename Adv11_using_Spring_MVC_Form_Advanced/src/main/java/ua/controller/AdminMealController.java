package ua.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.entity.Component;
import ua.entity.Cuisine;
import ua.entity.Meal;
import ua.repository.ComponentRepository;
import ua.repository.CuisineRepository;
import ua.service.MealService;

@Controller
@RequestMapping("/admin/meal")
public class AdminMealController {

	private final MealService service;

	@Autowired
	public AdminMealController(MealService service) {
		this.service = service;
	}
	
	@Autowired
	private CuisineRepository cuisineRepository;
	
	@Autowired
	private ComponentRepository componentRepository;
	
	@GetMapping
	public String show(Model model) {
		model.addAttribute("cuisines", service.findAllcuisines());
		model.addAttribute("components", service.findAllcomponents());
		model.addAttribute("meals", service.findAllView());
		return "meal";
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id) {
		service.delete(id);
		return "redirect:/admin/meal";
	}

	@PostMapping
	public String save(@RequestParam String name, @RequestParam String fullDescription,
			@RequestParam String shortDescription, @RequestParam BigDecimal price, @RequestParam List<Component> components, @RequestParam int weight,
			@RequestParam String cuisine) {
		Cuisine cuisine2 = cuisineRepository.findByName(cuisine);
		List<Component> components2=new ArrayList<>();
		components2.add(componentRepository.findOne(1));
		
		Meal meal=new Meal(name, fullDescription, shortDescription, price, components2, weight, cuisine2);
		service.save(meal);
		return "redirect:/admin/meal";
	}
}