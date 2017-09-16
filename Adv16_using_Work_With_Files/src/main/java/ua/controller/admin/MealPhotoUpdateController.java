package ua.controller.admin;

import java.security.Principal;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import ua.model.filter.SimpleFilter;
import ua.model.request.FileRequest;
import ua.service.FileWriter;
import ua.service.MealService;

@Controller
public class MealPhotoUpdateController {
	
	private final FileWriter writer;
	
	private final MealService service;
	
	public MealPhotoUpdateController(FileWriter writer, MealService service) {
		this.writer = writer;
		this.service = service;
	}

	@ModelAttribute("fileRequest")
	public FileRequest getForm() {
		return new FileRequest();
	}
	
	@GetMapping("/admin/mealPhotoUpdate")
	public String mealPhotoUpdate(Model model, @PageableDefault Pageable pageable, @ModelAttribute("filter") SimpleFilter filter) {
		model.addAttribute("meals", service.findAll(pageable, filter));
//		String email=principal.getName();
//		System.out.println(principal.getName());
//		User user = service.findByEmail(email);		
//		model.addAttribute("user", user.getPhotoUrl());
		return "mealPhotoUpdate";
	}

	@PostMapping("/admin/mealPhotoUpdate/{id}")
	public String saveFile(@PathVariable Integer id, Model model, @ModelAttribute("fileRequest") FileRequest request,
			Principal principal) {
		String photoUrl=writer.write(request.getFile());
//		String mealName = service.findById(id).getName();
		service.updatePhotoUrl(id, photoUrl);
		return "redirect:/admin/mealPhotoUpdate";
	}
	
}
