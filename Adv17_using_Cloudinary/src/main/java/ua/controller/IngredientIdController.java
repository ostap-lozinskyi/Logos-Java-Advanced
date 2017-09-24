package ua.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ua.service.IngredientService;

@Controller
public class IngredientIdController {

	private final IngredientService service;

	@Autowired
	public IngredientIdController(IngredientService service) {
		this.service = service;
	}

	@GetMapping("/ingredient{id}")
	public String ingredientId(Model model, @PathVariable Integer id) {
		model.addAttribute("ingredient", service.findById(id));
		model.addAttribute("components", service.findComponent(id));
		return "ingredientId";
	}

}