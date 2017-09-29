package ua.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.entity.Meal;
import ua.model.request.MealRequest;
import ua.service.CommentService;
import ua.service.MealService;

@Controller
@RequestMapping("/meal/{id}")
public class MealIdController {
	
	private final MealService service;

	private final CommentService commentService;

	@Autowired
	public MealIdController(MealService service, CommentService commentService) {
		this.service = service;
		this.commentService = commentService;
	}
	
	

//	@ModelAttribute("order")
//	public OrderRequest getForm() {
//		return new OrderRequest();
//	}
//	
//	@ModelAttribute("orderFilter")
//	public OrderFilter getFilter() {
//		return new OrderFilter();
//	}
	
	@GetMapping
	public String show(Model model, @PathVariable Integer id) {
		model.addAttribute("meal", service.findById(id));
		return "mealId";
	}
	
	@GetMapping("/comment")
	public String mealIdComent(Model model, @PathVariable Integer id, @RequestParam String text) {
		model.addAttribute("meal", service.findById(id));
		service.updateComments(id, text);
		return "mealId";
	}

//	@GetMapping
//	public String show(@PathVariable Integer id, Model model, @PageableDefault Pageable pageable, 
//			@ModelAttribute("orderFilter") OrderFilter filter) {
//		model.addAttribute("meals", service.findAllMeals());
//		model.addAttribute("orders", service.findForTable(id));
//		
//		model.addAttribute("orderedMeals", service.getOrderedMealsForTable(id));
//		model.addAttribute("placeCurrent", service.findPlaceById(id));
//		return "idOrder";
//	}

//	@PostMapping
//	public String save(@PathVariable Integer id, @ModelAttribute("order") @Validated(OrderFlag.class) OrderRequest request,
//			BindingResult br, Model model, SessionStatus status, @PageableDefault Pageable pageable,
//			@ModelAttribute("orderFilter") OrderFilter filter, Principal principal) {
//		Place place=new Place();
//		place.setId(id);
//		request.setPlace(place);
//		request.setStatus("Accepted");		
////		if (br.hasErrors())
////			return show(id, model, pageable, filter);
//		if (!request.getMeals().isEmpty())
//			service.save(request, principal);
//		return "redirect:/place/{id}/order";
//	}

}