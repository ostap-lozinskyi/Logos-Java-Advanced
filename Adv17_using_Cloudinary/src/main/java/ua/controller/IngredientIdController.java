package ua.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.entity.Comment;
import ua.model.request.CommentRequest;
import ua.model.view.ComponentView;
import ua.service.CommentService;
import ua.service.IngredientService;
import ua.validation.flag.CommentFlag;

@Controller
public class IngredientIdController {

	private final IngredientService service;
	
	private final CommentService commentService;

	@Autowired
	public IngredientIdController(IngredientService service, CommentService commentService) {
		this.service = service;
		this.commentService = commentService;
	}
	
	@ModelAttribute("comment")
	public CommentRequest getForm() {
		return new CommentRequest();
	}

	@GetMapping("/ingredient/{id}")
	public String show(Model model, @PathVariable Integer id) {
		model.addAttribute("ingredient", service.findById(id));
		List<ComponentView> componentsList = service.findComponent(id);
		List<Integer> componentsIds = new ArrayList<>();
		for (ComponentView componentView : componentsList) {
			componentsIds.add(componentView.getId());
		}
		model.addAttribute("meals", service.findMeal(componentsIds));
		return "ingredientId";
	}
	
	@PostMapping("/ingredient/{id}")
	public String ingredientIdComment(Model model, @PathVariable Integer id, @RequestParam String text,
			@ModelAttribute("comment") @Validated(CommentFlag.class) CommentRequest request, BindingResult br) {
		if (br.hasErrors())
			return show(model, id);
		Integer commentId = commentService.save(request);
		Comment comment = commentService.findById(commentId);
		service.updateComments(id, comment);
		return "redirect:/ingredient/{id}";
	}

}