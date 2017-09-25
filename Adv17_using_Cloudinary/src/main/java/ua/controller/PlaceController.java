package ua.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ua.service.OrderService;
import ua.service.PlaceService;
import ua.service.UserService;

@Controller
public class PlaceController {
	
	private final PlaceService service;
	
	private final UserService userService;
	
	private final OrderService orderService;
	
	public PlaceController(PlaceService service, UserService userService, OrderService orderService) {
		this.service = service;
		this.userService = userService;
		this.orderService = orderService;
	}
	
	@GetMapping("/place")
	public String place(Model model) {
		model.addAttribute("places", service.findAllPlaces());
		return "place";
	}	
	
//	@GetMapping("/place/setNotFree/{id}")
//	public String setNotFree(@PathVariable Integer id, Principal principal) {
//		userService.updateTableId(principal, id);
//		service.setNotFree(id);
//		return "redirect:/place";
//	}
	
	@GetMapping("/place/{id}/order")
	public String idOrder(Model model, @PathVariable Integer id, Principal principal) {
		userService.updateTableId(principal, id);
		service.setNotFree(id);
		model.addAttribute("meals", orderService.findAllMeals());
		
		return "idOrder";
	}
	
}