package ua.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ua.service.PlaceService;

@Controller
public class PlaceController {
	
	private final PlaceService service;
	
	public PlaceController(PlaceService service) {
		this.service=service;
	}
	
	@GetMapping("/place")
	public String place(Model model) {
		model.addAttribute("places", service.findAllPlaces());
		return "place";
	}	
	
	@GetMapping("/place/setNotFree/{id}")
	public String setNotFree(@PathVariable Integer id) {
		service.setNotFree(id);
		return "redirect:/place";
	}
	
}