package ua.service;

import java.util.List;

import ua.entity.Cuisine;
import ua.model.view.CuisineView;

public interface CuisineService extends CrudService<Cuisine, Integer> {
	List<String> findAllcuisines();

	List<CuisineView> findAllView();
}
