package ua.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ua.model.view.ComponentView;
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
		List<ComponentView> componentsList = service.findComponent(id);
		List<Integer> componentsIds = new ArrayList<>();
		for (ComponentView componentView : componentsList) {
			componentsIds.add(componentView.getId());
		}
		model.addAttribute("meals", service.findMeal(componentsIds));
		return "ingredientId";
	}

}