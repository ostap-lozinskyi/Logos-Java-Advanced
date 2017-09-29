package ua.controller;

import java.security.Principal;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.entity.Comment;
import ua.entity.User;
import ua.model.request.CommentRequest;
import ua.service.CommentService;
import ua.service.MealService;
import ua.service.UserService;
import ua.validation.flag.CommentFlag;

@Controller
@RequestMapping("/meal/{id}")
public class MealIdController {
	
	private final MealService service;

	private final CommentService commentService;
	
	private final UserService userService;

	@Autowired
	public MealIdController(MealService service, CommentService commentService, UserService userService) {
		this.service = service;
		this.commentService = commentService;
		this.userService = userService;
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
	
	@PostMapping
	public String mealIdCommentAndRate(Model model, @PathVariable Integer id, @RequestParam String text,
			@ModelAttribute("comment") CommentRequest request, BindingResult br,
			Principal principal, @RequestParam Integer rate) {
		if (br.hasErrors())
			return show(model, id);
		Integer commentId = commentService.save(request, principal);		
		Comment comment = commentService.findById(commentId);
		service.updateComments(id, comment);
		User user = userService.findByEmail(principal.getName());
		List<Integer> userMealsId = service.findByUserId(user.getId());
		if (userMealsId.contains(id)) {
			service.updateRate(id, rate);
			System.out.println("updated");
		} else {
			System.out.println("not updated");
		}
		return "redirect:/meal/{id}";
	}
	
}