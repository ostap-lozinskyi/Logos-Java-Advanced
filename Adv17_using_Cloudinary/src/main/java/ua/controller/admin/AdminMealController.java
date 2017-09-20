package ua.controller.admin;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import ua.model.filter.SimpleFilter;
import ua.model.request.FileRequest;
import ua.model.request.MealRequest;
import ua.service.FileWriter;
import ua.service.MealService;
import ua.validation.flag.MealFlag;

@Controller
@RequestMapping("/admin/meal")
@SessionAttributes("meal")
public class AdminMealController {
	
	private final FileWriter writer;

	private final MealService service;
	
	Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
			  "cloud_name", "hd4ylyjwf",
			  "api_key", "586222771451182",
			  "api_secret", "PonTilBATnfz9KBBhUkgulzmemE"));
	
	@Value("${file.path}")
	private String path;

	@Autowired
	public AdminMealController(FileWriter writer, MealService service) {
		this.writer = writer;
		this.service = service;
	}

	@ModelAttribute("meal")
	public MealRequest getForm() {
		return new MealRequest();
	}
	
	@ModelAttribute("filter")
	public SimpleFilter getFilter() {
		return new SimpleFilter();
	}
	
	@ModelAttribute("fileRequest")
	public FileRequest getFile() {
		return new FileRequest();
	}

	@GetMapping
	public String show(Model model, @PageableDefault Pageable pageable, @ModelAttribute("filter") SimpleFilter filter) {
		model.addAttribute("cuisines", service.findAllcuisines());
		model.addAttribute("components", service.findAllСomponents());
		model.addAttribute("meals", service.findAll(pageable, filter));
		if (service.findAll(pageable, filter).hasContent()||pageable.getPageNumber()==0)
			return "meal";
		else
			return "redirect:/admin/meal"+buildParams(pageable, filter);
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id, @PageableDefault Pageable pageable,
			@ModelAttribute("filter") SimpleFilter filter) {
		service.delete(id);
		return "redirect:/admin/meal"+buildParams(pageable, filter);
	}

	@PostMapping
	public String save(@ModelAttribute("meal") @Validated(MealFlag.class) MealRequest request, BindingResult br,
			Model model, SessionStatus status, @PageableDefault Pageable pageable,
			@ModelAttribute("filter") SimpleFilter filter) {
		if (br.hasErrors())
			return show(model, pageable, filter);
		service.save(request);
		return cancel(status, pageable, filter);
	}

	@GetMapping("/update/{id}")
	public String update(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable,
			@ModelAttribute("filter") SimpleFilter filter) {
		model.addAttribute("meal", service.findOneRequest(id));
		return show(model, pageable, filter);
	}

	@GetMapping("/cancel")
	public String cancel(SessionStatus status, @PageableDefault Pageable pageable, @ModelAttribute("filter") SimpleFilter filter) {
		status.setComplete();
		return "redirect:/admin/meal"+buildParams(pageable, filter);
	}
	
	@PostMapping("/photoUpdate/{id}")
	public String saveFile(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable,
			@ModelAttribute("filter") SimpleFilter filter, @ModelAttribute("fileRequest") FileRequest request) {
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
		return "redirect:/admin/meal"+buildParams(pageable, filter);
	}
	
	private String buildParams(Pageable pageable, SimpleFilter filter) {
		StringBuilder buffer = new StringBuilder();		
		buffer.append("?page=");
		if(!(service.findAll(pageable, filter).hasContent())) 
			buffer.append(String.valueOf(pageable.getPageNumber()));
		else {
			buffer.append(String.valueOf(pageable.getPageNumber()+1));
		}
		buffer.append("&size=");
		buffer.append(String.valueOf(pageable.getPageSize()));
		if(pageable.getSort()!=null){
			buffer.append("&sort=");
			Sort sort = pageable.getSort();
			sort.forEach((order)->{
				buffer.append(order.getProperty());
				if(order.getDirection()!=Direction.ASC)
				buffer.append(",desc");
			});
		}
		buffer.append("&search=");
		buffer.append(filter.getSearch());
		return buffer.toString();
	}
}