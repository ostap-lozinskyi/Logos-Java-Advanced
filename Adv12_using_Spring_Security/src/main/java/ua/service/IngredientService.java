package ua.service;

import java.util.List;

import ua.model.request.IngredientRequest;
import ua.model.view.IngredientView;

public interface IngredientService {

	List<IngredientView> findAllView();

	void save(IngredientRequest request);

	IngredientRequest findOneRequest(Integer id);

	void delete(Integer id);
}
