package ua.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.entity.Comment;
import ua.model.request.CommentRequest;
import ua.service.CommentService;
import ua.service.MealService;
import ua.validation.flag.CommentFlag;

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
	
	@ModelAttribute("comment")
	public CommentRequest getForm() {
		return new CommentRequest();
	}

	@GetMapping
	public String show(Model model, @PathVariable Integer id) {
		model.addAttribute("meal", service.findById(id));
		return "mealId";
	}
	
	@GetMapping("/comment")
	public String mealIdComent(Model model, @PathVariable Integer id, @RequestParam String text,
			@ModelAttribute("comment") @Validated(CommentFlag.class) CommentRequest request, BindingResult br) {
		model.addAttribute("meal", service.findById(id));
		if (br.hasErrors())
			return show(model, id);
		commentService.save(request);		
		Comment comment = commentService.findByText(request.getText());
		System.out.println(request.getId());
		service.updateComments(id, comment);
		return "mealId";
	}

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