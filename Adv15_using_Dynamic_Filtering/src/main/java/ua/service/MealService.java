package ua.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.model.filter.MealFilter;
import ua.model.request.MealRequest;
import ua.model.view.ComponentView;
import ua.model.view.MealIndexView;
import ua.model.view.MealView;

public interface MealService {

	List<String> findAllcuisines();

	List<ComponentView> findAllСomponentsView();
	
	Page<MealView> findAllView(Pageable pageable);
	
	Page<MealIndexView> findAll(MealFilter filter, Pageable pageable);

	void save(MealRequest request);

	MealRequest findOneRequest(Integer id);

	void delete(Integer id);

}