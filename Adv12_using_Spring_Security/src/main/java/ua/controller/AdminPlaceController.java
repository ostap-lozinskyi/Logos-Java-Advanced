package ua.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import ua.model.request.PlaceRequest;
import ua.service.PlaceService;

@Controller
@RequestMapping("/admin/place")
@SessionAttributes("place")
public class AdminPlaceController {

	private final PlaceService service;

	@Autowired
	public AdminPlaceController(PlaceService service) {
		this.service = service;
	}

	@ModelAttribute("place")
	public PlaceRequest getForm() {
		return new PlaceRequest();
	}

	@GetMapping
	public String show(Model model) {
		model.addAttribute("places", service.findAllView());
		return "place";
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id) {
		service.delete(id);
		return "redirect:/admin/place";
	}

	@PostMapping
	public String save(@ModelAttribute("place") PlaceRequest request, SessionStatus status) {
		service.save(request);
		return "redirect:/admin/place";
	}

	@GetMapping("/update/{id}")
	public String update(@PathVariable Integer id, Model model) {
		model.addAttribute("place", service.findOneRequest(id));
		return show(model);
	}

	@GetMapping("/cancel")
	public String cancel(SessionStatus status) {
		status.setComplete();
		return "redirect:/admin/place";
	}
}