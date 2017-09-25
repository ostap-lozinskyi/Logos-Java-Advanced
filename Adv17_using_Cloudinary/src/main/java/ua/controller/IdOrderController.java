package ua.controller;

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

import ua.entity.Place;
import ua.model.filter.OrderFilter;
import ua.model.request.OrderRequest;
import ua.service.OrderService;
import ua.validation.flag.OrderFlag;

@Controller
@RequestMapping("/place/{id}/order")
@SessionAttributes("order")
public class IdOrderController {

	private final OrderService service;

	@Autowired
	public IdOrderController(OrderService service) {
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
	public String show(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable, 
			@ModelAttribute("orderFilter") OrderFilter filter) {
		model.addAttribute("meals", service.findAllMeals());
		model.addAttribute("places", service.findAllPlace());
		model.addAttribute("orders", service.findAll(pageable, filter));
		model.addAttribute("placeCurrent", service.findPlaceById(id));
		//if (service.findAll(pageable, filter).hasContent()||pageable.getPageNumber()==0)
			return "idOrder";
		//else
			//return "redirect:/admin/adminOrder"+buildParams(pageable, filter);
	}

	@GetMapping("/delete/{id}")
	public String delete(@PathVariable Integer id, @PageableDefault Pageable pageable,
			@ModelAttribute("orderFilter") OrderFilter filter) {
		service.delete(id);
		return "redirect:/place/{id}/order"+buildParams(pageable, filter);
	}

	@PostMapping
	public String save(@PathVariable Integer id, @ModelAttribute("order") @Validated(OrderFlag.class) OrderRequest request, BindingResult br,
			Model model, SessionStatus status, @PageableDefault Pageable pageable,
			@ModelAttribute("orderFilter") OrderFilter filter) {
//		if (br.hasErrors())
//			return show(model, pageable, filter);
		Place place=new Place();
		place.setId(id);
		request.setPlace(place);
		service.save(request);
		return "redirect:/place/{id}/order"+buildParams(pageable, filter);
	}

//	@GetMapping("/update/{id}")
//	public String update(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable,
//			@ModelAttribute("orderFilter") OrderFilter filter) {
//		model.addAttribute("order", service.findOneRequest(id));
//		return show(model, pageable, filter);
//	}

	
	
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