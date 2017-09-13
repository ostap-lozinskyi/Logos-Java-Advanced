package ua.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import ua.entity.User;
import ua.model.filter.MealFilter;
import ua.model.request.FileRequest;
import ua.service.FileWriter;

@Controller
public class UserCabinetController {
	
	private final FileWriter writer;
	
	public UserCabinetController(FileWriter writer) {
		this.writer = writer;
	}

	@ModelAttribute("fileRequest")
	public FileRequest getForm() {
		return new FileRequest();
	}

	@GetMapping("/userCabinet")
	public String userCabinet(Model model, User user, @ModelAttribute("mealFilter") MealFilter filter,
			@PageableDefault Pageable pageable) {
		return "userCabinet";
	}

	@PostMapping("/userCabinet")
	public String saveFile(@ModelAttribute("fileRequest") FileRequest request) {
		System.out.println(writer.write(request.getFile()));
		return "redirect:/userCabinet";
	}
	
}
