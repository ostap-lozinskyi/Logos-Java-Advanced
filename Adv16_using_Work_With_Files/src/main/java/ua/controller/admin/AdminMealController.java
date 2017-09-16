package ua.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
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

import ua.model.filter.SimpleFilter;
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
	
	@ModelAttribute("filter")
	public SimpleFilter getFilter() {
		return new SimpleFilter();
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