package ua.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.entity.Cuisine;
import ua.model.view.CuisineView;

public interface CuisineService extends CrudService<Cuisine, Integer> {

	Page<CuisineView> findAll(Pageable pageable);

}
