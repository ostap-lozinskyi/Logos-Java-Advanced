package ua.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import ua.entity.User;
import ua.model.request.FileRequest;
import ua.model.request.RegistrationRequest;
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
	
	@GetMapping("/userCabinet")
	public String userCabinet(Model model, Principal principal) {
		String email=principal.getName();
		System.out.println(principal.getName());
		User user = service.findByEmail(email);		
		model.addAttribute("user", user.getPhotoUrl());
		return "userCabinet";
	}

	@PostMapping("/userCabinet")
	public String saveFile(Model model, @ModelAttribute("fileRequest") FileRequest request,
			RegistrationRequest registrationRequest, Principal principal) {
		String photoUrl=writer.write(request.getFile());
		service.updatePhotoUrl(principal, photoUrl);
		return "redirect:/userCabinet";
	}
	
}
