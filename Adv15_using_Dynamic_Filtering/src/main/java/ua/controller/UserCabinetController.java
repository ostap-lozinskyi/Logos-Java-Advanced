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
import ua.model.request.UserPhotoRequest;
import ua.service.FileWriter;
import ua.service.UserService;

@Controller
public class UserCabinetController {
	
	private final FileWriter writer;
	
	private final UserService service;
	
	public UserCabinetController(FileWriter writer, UserService service) {
		this.writer = writer;
		this.service = service;
	}

	@ModelAttribute("fileRequest")
	public FileRequest getForm() {
		return new FileRequest();
	}
	
	@ModelAttribute("user")
	public User getPhotoUrl() {
		return new User();
	}

	@GetMapping("/userCabinet")
	public String userCabinet(Model model, User user, @ModelAttribute("mealFilter") MealFilter filter,
			@PageableDefault Pageable pageable) {
		return "userCabinet";
	}

	@PostMapping("/userCabinet")
	public String saveFile(Model model, @ModelAttribute("fileRequest") FileRequest request, UserPhotoRequest userPhotoRequest, User user) {
		String s=writer.write(request.getFile());
		model.addAttribute("user", service.findOneRequest(user));
		service.savePhotoUrl(userPhotoRequest, s, user);
		return "redirect:/userCabinet";
	}
	
}
