package ua.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import ua.entity.Ms;
import ua.service.MsService;
import ua.validation.flag.MsFlag;

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
	public Ms getForm() {
		return new Ms();
	}

	@GetMapping
	public String show(Model model, @PageableDefault Pageable pageable) {
		model.addAttribute("mss", service.findAllView(pageable));
		return "ms";
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id) {
		service.delete(id);
		return "redirect:/admin/ms";
	}

	@PostMapping
	public String save(@ModelAttribute("ms") @Validated(MsFlag.class) Ms ms, BindingResult br, Model model,
			SessionStatus status, @PageableDefault Pageable pageable) {
		if (br.hasErrors())
			return show(model, pageable);
		service.save(ms);
		return cancel(status);
	}

	@GetMapping("/update/{id}")
	public String update(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable) {
		model.addAttribute("ms", service.findOne(id));
		return show(model, pageable);
	}

	@GetMapping("/cancel")
	public String cancel(SessionStatus status) {
		status.setComplete();
		return "redirect:/admin/ms";
	}
}