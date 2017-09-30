package ua.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.entity.Comment;
import ua.entity.Ingredient;
import ua.model.filter.MealFilter;
import ua.model.filter.SimpleFilter;
import ua.model.view.ComponentView;
import ua.model.view.IngredientView;
import ua.model.view.MealView;

public interface IngredientService extends CrudService<Ingredient, Integer> {

	Page<Ingredient> findAll(Pageable pageable, SimpleFilter filter);
	
	IngredientView findById(Integer id);
	
	List<ComponentView> findComponent(Integer id);
	
	Page<MealView> findMeal(MealFilter filter, Pageable pageable);
	
	void updateComments(Integer id, Comment comment);
	
	List<Comment> findCommentList(Integer id);

}
