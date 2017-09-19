package ua.controller.admin;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
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

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;

@Controller
public class MealPhotoUpdateController {
	
	private final FileWriter writer;
	
	private final MealService service;
	
	Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
			  "cloud_name", "hd4ylyjwf",
			  "api_key", "586222771451182",
			  "api_secret", "PonTilBATnfz9KBBhUkgulzmemE"));
	
	@Value("${file.path}")
	private String path;
	
	public MealPhotoUpdateController(FileWriter writer, MealService service) {
		this.writer = writer;
		this.service = service;
	}

	@ModelAttribute("fileRequest")
	public FileRequest getForm() {
		return new FileRequest();
	}
	
	@GetMapping("/admin/mealPhotoUpdate")
	public String mealPhotoUpdate(Model model, @PageableDefault Pageable pageable, 
			@ModelAttribute("filter") SimpleFilter filter) {
		model.addAttribute("meals", service.findAll(pageable, filter));
		return "mealPhotoUpdate";
	}

	@PostMapping("/admin/mealPhotoUpdate/{id}")
	public String saveFile(@PathVariable Integer id, Model model, 
			@ModelAttribute("fileRequest") FileRequest request,	Principal principal) {
		String photoUrl=writer.write(request.getFile());
		File toUpload = new File(path+photoUrl);
		Map<String, String> uploadResult= new HashMap<>();
		try {
			uploadResult = cloudinary.uploader().upload(toUpload, ObjectUtils.emptyMap());
		} catch (IOException e) {
			e.printStackTrace();
		}
		String cloudinaryUrl = uploadResult.get("url");
		service.updatePhotoUrl(id, cloudinaryUrl);
		return "redirect:/admin/mealPhotoUpdate";
	}
	
}
