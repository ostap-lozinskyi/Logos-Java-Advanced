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

import ua.model.filter.ComponentFilter;
import ua.model.request.ComponentRequest;
import ua.service.ComponentService;
import ua.validation.flag.ComponentFlag;

@Controller
@RequestMapping("/admin/component")
@SessionAttributes("component")
public class AdminComponentController {

	private final ComponentService service;

	@Autowired
	public AdminComponentController(ComponentService service) {
		this.service = service;
	}

	@ModelAttribute("component")
	public ComponentRequest getForm() {
		return new ComponentRequest();
	}
	
	@ModelAttribute("componentFilter")
	public ComponentFilter getFilter() {
		return new ComponentFilter();
	}

	@GetMapping
	public String show(Model model, @PageableDefault Pageable pageable,
			@ModelAttribute("componentFilter") ComponentFilter filter) {
		model.addAttribute("ingredients", service.findAllIngredients());
		model.addAttribute("mss", service.findAllMss());
		model.addAttribute("components", service.findAllView(pageable, filter));
		if (service.findAllView(pageable, filter).hasContent()||pageable.getPageNumber()==0)
			return "component";
		else
			return "redirect:/admin/component"+buildParams(pageable, filter);
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id, @PageableDefault Pageable pageable,
			@ModelAttribute("componentFilter") ComponentFilter filter) {
		service.delete(id);
		return "redirect:/admin/component"+buildParams(pageable, filter);
	}

	@PostMapping
	public String save(@ModelAttribute("component") @Validated(ComponentFlag.class) ComponentRequest request,
			BindingResult br, Model model, SessionStatus status, @PageableDefault Pageable pageable,
			@ModelAttribute("componentFilter") ComponentFilter filter) {
		if (br.hasErrors())
			return show(model, pageable, filter);
		service.save(request);
		return cancel(status, pageable, filter);
	}

	@GetMapping("/update/{id}")
	public String update(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable,
			@ModelAttribute("componentFilter") ComponentFilter filter) {
		model.addAttribute("component", service.findOneRequest(id));
		return show(model, pageable, filter);
	}

	@GetMapping("/cancel")
	public String cancel(SessionStatus status, @PageableDefault Pageable pageable,
			@ModelAttribute("componentFilter") ComponentFilter filter) {
		status.setComplete();
		return "redirect:/admin/component"+buildParams(pageable, filter);
	}
	
	private String buildParams(Pageable pageable, ComponentFilter filter) {
		StringBuilder buffer = new StringBuilder();		
		buffer.append("?page=");
		if(!(service.findAllView(pageable, filter).hasContent())) 
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
