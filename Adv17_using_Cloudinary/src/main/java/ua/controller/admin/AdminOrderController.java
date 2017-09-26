package ua.controller.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import ua.model.filter.OrderFilter;
import ua.model.request.OrderRequest;
import ua.model.view.MealView;
import ua.model.view.OrderView;
import ua.service.OrderService;

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
		
		Page<OrderView> ordersPage = service.findAll(pageable, filter);
		List<List<MealView>> orderedMeals=new ArrayList<>();
		for (OrderView orderView : ordersPage) {
			orderedMeals.add(service.findForOrder(orderView.getId()));
			System.out.println(service.findForOrder(orderView.getId()));
		}
		for (List<MealView> orderView : orderedMeals) {
			System.out.println(orderView);
		}
		
		model.addAttribute("orderedMeals", orderedMeals);
		if (service.findAll(pageable, filter).hasContent()||pageable.getPageNumber()==0)
			return "adminOrder";
		else
			return "redirect:/admin/adminOrder"+buildParams(pageable, filter);
	}

	@GetMapping("/updateStatus/{id}/{status}")
	public String update(@PathVariable Integer id, @PathVariable String status, Model model,
			@PageableDefault Pageable pageable,	@ModelAttribute("orderFilter") OrderFilter filter) {
		service.updateStatus(id, status);
		return "redirect:/admin/adminOrder"+buildParams(pageable, filter);
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