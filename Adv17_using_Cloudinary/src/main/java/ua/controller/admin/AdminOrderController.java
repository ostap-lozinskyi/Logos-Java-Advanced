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

import ua.model.filter.OrderFilter;
import ua.model.request.OrderRequest;
import ua.service.OrderService;
import ua.validation.flag.OrderFlag;

@Controller
@RequestMapping("/admin/adminOrder")
@SessionAttributes("order")
public class AdminOrderController {

	private final OrderService service;

	@Autowired
	public AdminOrderController(OrderService service) {
		this.service = service;
	}

	@ModelAttribute("order")
	public OrderRequest getForm() {
		return new OrderRequest();
	}
	
	@ModelAttribute("orderFilter")
	public OrderFilter getFilter() {
		return new OrderFilter();
	}

	@GetMapping
	public String show(Model model, @PageableDefault Pageable pageable, 
			@ModelAttribute("orderFilter") OrderFilter filter) {
		model.addAttribute("meals", service.findAllMeals());
		model.addAttribute("places", service.findAllPlace());
		model.addAttribute("orders", service.findAll(pageable, filter));
		if (service.findAll(pageable, filter).hasContent()||pageable.getPageNumber()==0)
			return "adminOrder";
		else
			return "redirect:/admin/adminOrder"+buildParams(pageable, filter);
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id, @PageableDefault Pageable pageable,
			@ModelAttribute("orderFilter") OrderFilter filter) {
		service.delete(id);
		return "redirect:/admin/adminOrder"+buildParams(pageable, filter);
	}

	@PostMapping
	public String save(@ModelAttribute("order") @Validated(OrderFlag.class) OrderRequest request, BindingResult br,
			Model model, SessionStatus status, @PageableDefault Pageable pageable,
			@ModelAttribute("orderFilter") OrderFilter filter) {
		if (br.hasErrors())
			return show(model, pageable, filter);
		service.save(request);
		return cancel(status, pageable, filter);
	}

	@GetMapping("/update/{id}")
	public String update(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable,
			@ModelAttribute("orderFilter") OrderFilter filter) {
		model.addAttribute("order", service.findOneRequest(id));
		return show(model, pageable, filter);
	}

	@GetMapping("/cancel")
	public String cancel(SessionStatus status, @PageableDefault Pageable pageable,
			@ModelAttribute("orderFilter") OrderFilter filter) {
		status.setComplete();
		return "redirect:/admin/adminOrder"+buildParams(pageable, filter);
	}
	
	private String buildParams(Pageable pageable, OrderFilter filter) {
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
		return buffer.toString();
	}
}