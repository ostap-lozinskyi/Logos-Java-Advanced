package ua.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.entity.Ms;
import ua.service.MsService;

@Controller
@RequestMapping("/admin/ms")
public class AdminMsController {

	private final MsService service;

	@Autowired
	public AdminMsController(MsService service) {
		this.service = service;
	}

	@GetMapping
	public String show(Model model) {
		model.addAttribute("ms", service.findAll());
		return "ms";
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id) {
		service.delete(id);
		return "redirect:/admin/ms";
	}
	
	@PostMapping
	public String save(@RequestParam String name) {
		service.save(new Ms(name));
		return "redirect:/admin/ms";
	}
}