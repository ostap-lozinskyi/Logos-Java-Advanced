package ua.controller;

import java.security.Principal;
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
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ua.entity.Comment;
import ua.entity.User;
import ua.model.filter.MealFilter;
import ua.model.request.CommentRequest;
import ua.model.view.ComponentView;
import ua.model.view.IngredientView;
import ua.model.view.MealView;
import ua.service.CommentService;
import ua.service.IngredientService;
import ua.service.UserService;
import ua.validation.flag.CommentFlag;

@Controller
public class IngredientIdController {

	private final IngredientService service;
	
	private final CommentService commentService;
	
	private final UserService userService;
	
	Page<MealView> mealViews;
	
	@Autowired
	public IngredientIdController(IngredientService service, CommentService commentService,
			UserService userService) {
		this.service = service;
		this.commentService = commentService;
		this.userService = userService;
	}
	
	@ModelAttribute("mealFilter")
	public MealFilter getFilter() {
		return new MealFilter();
	}
	
	@ModelAttribute("comment")
	public CommentRequest getForm() {
		return new CommentRequest();
	}

	@GetMapping("/ingredient/{id}")
	public String show(Model model, @PathVariable Integer id, @PageableDefault Pageable pageable, 
			@ModelAttribute("mealFilter") MealFilter filter) {
		IngredientView ingredient = service.findById(id);
		ingredient.setComments(service.findCommentList(id));
		model.addAttribute("ingredient", ingredient);
		List<ComponentView> componentsList = service.findComponent(id);
		if (!componentsList.isEmpty()) {
			List<Integer> componentsIds = new ArrayList<>();
			for (ComponentView componentView : componentsList) {
				componentsIds.add(componentView.getId());
			}
			filter.setComponentsId(componentsIds);
			mealViews = service.findMeal(filter, pageable);
			model.addAttribute("meals", mealViews);
		} 
		
		if (service.findMeal(filter, pageable).hasContent()||pageable.getPageNumber()==0)
			return "ingredientId";
		else
			return "redirect:/ingredient/{id}"+buildParams(pageable, filter);
	}
	
	@PostMapping("/ingredient/{id}")
	public String ingredientIdComment(Model model, @PathVariable Integer id, @RequestParam String text,
			@ModelAttribute("comment") @Validated(CommentFlag.class) CommentRequest request, 
			BindingResult br, Principal principal, @PageableDefault Pageable pageable, 
			@ModelAttribute("mealFilter") MealFilter filter) {
		if (br.hasErrors())
			return show(model, id, pageable, filter);
		User user = userService.findByEmail(principal.getName());
		boolean hasMeal = false;
		List<MealView> userMeals = userService.findUserMealsIds(user);
		if (mealViews != null) {
			for (MealView mealView : mealViews) {
				for (MealView userMeal : userMeals) {
					if (mealView.getId() == userMeal.getId()) {
						hasMeal = true;
					}
				}
			}
			if (hasMeal == true) {
				Integer commentId = commentService.save(request, principal);
				Comment comment = commentService.findById(commentId);
				service.updateComments(id, comment);
				hasMeal = false;
			}
		} 
		return "redirect:/ingredient/{id}";
	}
	
	private String buildParams(Pageable pageable, MealFilter filter) {
		StringBuilder buffer = new StringBuilder();		
		buffer.append("?page=");
		if(!(service.findMeal(filter, pageable).hasContent())) 
			buffer.append(String.valueOf(pageable.getPageNumber()));
		else {
			buffer.append(String.valueOf(pageable.getPageNumber()));
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