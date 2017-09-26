package ua.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
import ua.model.view.MealView;
import ua.model.view.OrderView;
import ua.service.OrderService;
import ua.validation.flag.OrderFlag;

@Controller
@RequestMapping("/place/{id}/order")
@SessionAttributes("order2")
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
		model.addAttribute("orders", service.findForTable(id));
		
		List<OrderView> ordersList = service.findForTable(id);
		List<List<MealView>> orderedMeals=new ArrayList<>();
		for (OrderView orderView : ordersList) {
			orderedMeals.add(service.findForOrder(orderView.getId()));
		}	
		model.addAttribute("orderedMeals", orderedMeals);
		model.addAttribute("placeCurrent", service.findPlaceById(id));
		return "idOrder";
	}

	@PostMapping
	public String save(@PathVariable Integer id, @ModelAttribute("order") @Validated(OrderFlag.class) OrderRequest request, BindingResult br,
			Model model, SessionStatus status, @PageableDefault Pageable pageable,
			@ModelAttribute("orderFilter") OrderFilter filter) {
//		if (br.hasErrors()) System.out.println("!!!!!!!!");
//			return show(model, pageable, filter);
		System.out.println("!!!!!!!!!!!");
		Place place=new Place();
		place.setId(id);
		System.out.println(place.getId());
		request.setPlace(place);
		service.save(request);
		return "redirect:/place/{id}/order";
	}

}