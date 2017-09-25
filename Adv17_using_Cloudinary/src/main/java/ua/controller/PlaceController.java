package ua.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import ua.service.PlaceService;

@Controller
public class PlaceController {
	
	private final PlaceService service;
	
	public PlaceController(PlaceService service) {
		this.service = service;
	}
	
	@GetMapping("/place")
	public String place(Model model) {
		model.addAttribute("places", service.findAllPlaces());
		return "place";
	}	
	
}