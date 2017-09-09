package ua.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.model.filter.MealFilter;
import ua.model.view.MealIndexView;

public interface MealViewService {

	Page<MealIndexView> findAll(MealFilter filter, Pageable pageable);

	List<String> findAllCuisines();

}
