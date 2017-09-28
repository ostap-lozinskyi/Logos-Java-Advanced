package ua.controller;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import ua.entity.User;
import ua.model.request.FileRequest;
import ua.service.FileWriter;
import ua.service.UserService;

@Controller
public class UserCabinetController {
	
	private final FileWriter writer;
	
	private final UserService service;
	
	@Value("${cloudinary.url}")
	Cloudinary cloudinary = new Cloudinary();
	
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
		model.addAttribute("user", user.getPhotoUrl());
		return "userCabinet";
	}

	@PostMapping("/userCabinet")
	public String saveFile(Model model, @ModelAttribute("fileRequest") FileRequest request,
			Principal principal) {
		String email=principal.getName();
		User user = service.findByEmail(email);	
		String photoUrl=writer.write(request.getFile());
		service.updatePhotoUrl(principal, photoUrl);
		
		File toUpload = new File(path+photoUrl);
		@SuppressWarnings("rawtypes")
		Map uploadResult;
		try {
			uploadResult = cloudinary.uploader().upload(toUpload,
					ObjectUtils.asMap("use_filename", "true", "unique_filename", "false"));
			String cloudinaryUrl = (String) uploadResult.get("url");
			String oldPhotoUrl = user.getPhotoUrl();
			if ((oldPhotoUrl != null) && (oldPhotoUrl.equals(cloudinaryUrl))) {
				user.setVersion(user.getVersion() + 1);
			} else {
				user.setVersion(0);
			}
			user.setPhotoUrl(cloudinaryUrl);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "redirect:/userCabinet";
	}
	
}
