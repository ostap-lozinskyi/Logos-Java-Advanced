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

import ua.model.request.MealRequest;
import ua.service.MealService;
import ua.validation.flag.MealFlag;

@Controller
@RequestMapping("/admin/meal")
@SessionAttributes("meal")
public class AdminMealController {

	private final MealService service;

	@Autowired
	public AdminMealController(MealService service) {
		this.service = service;
	}

	@ModelAttribute("meal")
	public MealRequest getForm() {
		return new MealRequest();
	}

	@GetMapping
	public String show(Model model, @PageableDefault Pageable pageable) {
		model.addAttribute("cuisines", service.findAllcuisines());
		model.addAttribute("components", service.findAllСomponentsView());
		model.addAttribute("meals", service.findAllView(pageable));
		return "meal";
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id) {
		service.delete(id);
		return "redirect:/admin/meal";
	}

	@PostMapping
	public String save(@ModelAttribute("meal") @Validated(MealFlag.class) MealRequest request, BindingResult br,
			Model model, SessionStatus status, @PageableDefault Pageable pageable) {
		if (br.hasErrors())
			return show(model, pageable);
		service.save(request);
		return cancel(status);
	}

	@GetMapping("/update/{id}")
	public String update(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable) {
		model.addAttribute("meal", service.findOneRequest(id));
		return show(model, pageable);
	}

	@GetMapping("/cancel")
	public String cancel(SessionStatus status) {
		status.setComplete();
		return "redirect:/admin/meal";
	}
}