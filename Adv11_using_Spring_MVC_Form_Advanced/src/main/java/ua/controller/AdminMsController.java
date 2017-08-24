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

import ua.model.request.MsRequest;
import ua.service.MsService;

@Controller
@RequestMapping("/admin/ms")
@SessionAttributes("ms")
public class AdminMsController {

	private final MsService service;

	@Autowired
	public AdminMsController(MsService service) {
		this.service = service;
	}

	@ModelAttribute("ms")
	public MsRequest getForm() {
		return new MsRequest();
	}

	@GetMapping
	public String show(Model model) {
		model.addAttribute("mss", service.findAllView());
		return "ms";
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id) {
		service.delete(id);
		return "redirect:/admin/ms";
	}

	@PostMapping
	public String save(@ModelAttribute("ms") MsRequest request, SessionStatus status) {
		service.save(request);
		return "redirect:/admin/ms";
	}

	@GetMapping("/update/{id}")
	public String update(@PathVariable Integer id, Model model) {
		model.addAttribute("ms", service.findOneRequest(id));
		return show(model);
	}

	@GetMapping("/cancel")
	public String cancel(SessionStatus status) {
		status.setComplete();
		return "redirect:/admin/ms";
	}
}