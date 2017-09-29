package ua.controller;

import java.io.File;
import java.security.Principal;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import ua.entity.User;
import ua.model.request.FileRequest;
import ua.service.FileWriter;
import ua.service.UserService;

@Controller
public class UserCabinetController {
	
	private final FileWriter writer;
	
	private final UserService service;
	
	@Value("${file.path}")
	private String path;
	
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
		User user = service.findByEmail(email);		
		model.addAttribute("user", user);
		return "userCabinet";
	}

	@PostMapping("/userCabinet")
	public String saveFile(Model model, @ModelAttribute("fileRequest") FileRequest request,
			Principal principal) {
		String photoUrl=writer.write(request.getFile());
		File toUpload = new File(path+photoUrl);
		service.uploadPhotoToCloudinary(toUpload, principal);
		return "redirect:/userCabinet";
	}
	
}
