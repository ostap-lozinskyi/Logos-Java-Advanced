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

import ua.model.request.OrderRequest;
import ua.service.OrderService;
import ua.validation.flag.OrderFlag;

@Controller
@RequestMapping("/admin/order")
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

	@GetMapping
	public String show(Model model, @PageableDefault Pageable pageable) {
		model.addAttribute("meals", service.findAllMeals());
		model.addAttribute("places", service.findAllPlace());
		model.addAttribute("orders", service.findAll(pageable));
		if (service.findAll(pageable).hasContent()||pageable.getPageNumber()==0)
			return "order";
		else
			return "redirect:/admin/order"+buildParams(pageable);
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id, @PageableDefault Pageable pageable) {
		service.delete(id);
		return "redirect:/admin/order"+buildParams(pageable);
	}

	@PostMapping
	public String save(@ModelAttribute("order") @Validated(OrderFlag.class) OrderRequest request, BindingResult br,
			Model model, SessionStatus status, @PageableDefault Pageable pageable) {
		if (br.hasErrors())
			return show(model, pageable);
		service.save(request);
		return cancel(status, pageable);
	}

	@GetMapping("/update/{id}")
	public String update(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable) {
		model.addAttribute("order", service.findOneRequest(id));
		return show(model, pageable);
	}

	@GetMapping("/cancel")
	public String cancel(SessionStatus status, @PageableDefault Pageable pageable) {
		status.setComplete();
		return "redirect:/admin/order"+buildParams(pageable);
	}
	
	private String buildParams(Pageable pageable) {
		StringBuilder buffer = new StringBuilder();		
		buffer.append("?page=");
		if(!(service.findAll(pageable).hasContent())) 
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