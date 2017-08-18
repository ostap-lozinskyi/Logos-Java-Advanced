package ua.service;

import java.util.List;

import ua.entity.Meal;
import ua.model.view.MealView;

public interface MealService extends CrudService<Meal, Integer> {

	List<String> findAllcuisines();
	
	List<String> findAllcomponents();

	List<MealView> findAllView();
}
