package ua.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.entity.Meal;
import ua.model.filter.MealFilter;
import ua.model.filter.SimpleFilter;
import ua.model.request.MealRequest;
import ua.model.view.ComponentView;
import ua.model.view.MealIndexView;

public interface MealService {

	List<String> findAllcuisines();

	List<ComponentView> findAllСomponents();
	
	Page<Meal> findAll(Pageable pageable, SimpleFilter filter);
	
	Page<MealIndexView> findAll(MealFilter filter, Pageable pageable);

	void save(MealRequest request);

	MealRequest findOneRequest(Integer id);

	void delete(Integer id);
	
//	void updatePhotoUrl(Integer id, String photoUrl);
	
	void updateRate(Integer id, Integer newRate);
	
	Meal findById(Integer id);

}