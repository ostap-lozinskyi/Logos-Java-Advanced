package ua.service;

import java.util.List;

import ua.model.request.CuisineRequest;
import ua.model.view.CuisineView;

public interface CuisineService {

	List<CuisineView> findAllView();

	void save(CuisineRequest request);

	CuisineRequest findOneRequest(Integer id);

	void delete(Integer id);
}
