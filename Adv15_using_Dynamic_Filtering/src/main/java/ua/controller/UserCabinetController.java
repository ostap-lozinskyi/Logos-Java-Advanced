package ua.controller;

import java.security.Principal;

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
import ua.model.request.RegistrationRequest;
import ua.repository.UserRepository;
import ua.service.FileWriter;
import ua.service.UserService;

@Controller
public class UserCabinetController {
	
	private final FileWriter writer;
	
	private final UserService service;
	
	private final UserRepository userRepository;
	
	private String photoUrl;
	
	public UserCabinetController(FileWriter writer, UserService service, UserRepository userRepository) {
		this.writer = writer;
		this.service = service;
		this.userRepository = userRepository;
	}

	@ModelAttribute("fileRequest")
	public FileRequest getForm() {
		return new FileRequest();
	}
	
	@GetMapping("/userCabinet")
	public String userCabinet(Model model, Principal principal) {
		String email=principal.getName();
		System.out.println(principal.getName());
		User user = userRepository.findByEmail(email);
		
		model.addAttribute("user", user.getPhotoUrl());
		//System.out.println(user.getPhotoUrl());
		return "userCabinet";
	}

	@PostMapping("/userCabinet")
	public String saveFile(Model model, @ModelAttribute("fileRequest") FileRequest request,
			RegistrationRequest registrationRequest, Principal principal) {
		String s=writer.write(request.getFile());
		photoUrl=s;
		//model.addAttribute("user", s);
		//System.out.println(user.getPhotoUrl());
		
		service.savePhoto(principal, s);
		return "redirect:/userCabinet";
	}
	
}
