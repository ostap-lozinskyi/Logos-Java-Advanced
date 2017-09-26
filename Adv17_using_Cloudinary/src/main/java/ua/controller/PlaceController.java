package ua.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ua.service.PlaceService;
import ua.service.UserService;

@Controller
public class PlaceController {
	
	private final PlaceService service;
	
	private final UserService userService;
	
	public PlaceController(PlaceService service, UserService userService) {
		this.service = service;
		this.userService = userService;
	}
	
	@GetMapping("/place")
	public String place(Model model) {
		model.addAttribute("places", service.findAllPlaces());
		return "place";
	}
	
	@GetMapping("/place/setNotFree/{id}")
	public String setNotFree(@PathVariable Integer id, Principal principal) {
		userService.updateTableId(principal, id);
		service.setNotFree(id);
		return "redirect:/place/{id}/order";
	}
	
}