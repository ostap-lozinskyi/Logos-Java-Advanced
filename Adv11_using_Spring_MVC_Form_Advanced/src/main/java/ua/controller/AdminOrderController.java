package ua.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.entity.Meal;
import ua.entity.Order;
import ua.entity.Place;
import ua.repository.MealRepository;
import ua.service.OrderService;

@Controller
@RequestMapping("/admin/order")
public class AdminOrderController {

	private final OrderService service;

	@Autowired
	private MealRepository mealRepository;

	@Autowired
	public AdminOrderController(OrderService service) {
		this.service = service;
	}

	@GetMapping
	public String show(Model model) {
		model.addAttribute("meals", service.findAllMeals());
		model.addAttribute("places", service.findAllPlaces());
		model.addAttribute("orders", service.findAllView());
		return "order";
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id) {
		service.delete(id);
		return "redirect:/admin/order";
	}

	@PostMapping
	public String save(@RequestParam Place place) {
		List<Meal> meals = mealRepository.findAll();
		Order order = new Order(meals, place);
		service.save(order);
		return "redirect:/admin/order";
	}
}