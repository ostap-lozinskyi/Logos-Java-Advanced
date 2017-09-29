package ua.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.entity.Comment;
import ua.model.filter.MealFilter;
import ua.model.request.MealRequest;
import ua.model.view.ComponentView;
import ua.model.view.MealIndexView;
import ua.model.view.MealView;

public interface MealService {

	List<String> findAllcuisines();

	List<ComponentView> findAllСomponentsView();
	
	Page<MealIndexView> findAll(MealFilter filter, Pageable pageable);
	
	List<MealIndexView> find5MealsByRate();
	
	Page<MealView> findAllView(MealFilter filter, Pageable pageable);

	void save(MealRequest request);

	MealRequest findOneRequest(Integer id);

	void delete(Integer id);
	
	void updateRate(Integer id, Integer newRate);
	
	void updateComments(Integer id, String text);
	
	MealView findById(Integer id);
	
	List<Integer> findByUserId(Integer id);
	
	MealRequest uploadPhotoToCloudinary(MealRequest request, File toUpload) throws IOException;

}