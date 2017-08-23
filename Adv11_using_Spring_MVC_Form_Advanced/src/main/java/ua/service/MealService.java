package ua.service;

import java.util.List;

import ua.model.request.MealRequest;
import ua.model.view.MealView;

public interface MealService {

	List<String> findAllcuisines();

	List<String> findAllcomponents();

	List<MealView> findAllView();

	void save(MealRequest request);

	MealRequest findOneRequest(Integer id);

	void delete(Integer id);
}
