package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Ingredient;
import ua.model.request.IngredientRequest;
import ua.model.view.IngredientView;
import ua.repository.IngredientRepository;
import ua.service.IngredientService;

@Service
public class IngredientServiceImpl implements IngredientService {

	private final IngredientRepository repository;

	@Autowired
	public IngredientServiceImpl(IngredientRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<IngredientView> findAllView() {
		return repository.findAllView();
	}
	
	@Override
	public void save(IngredientRequest request) {
		Ingredient ingredient = new Ingredient();
		ingredient.setId(request.getId());
		ingredient.setName(request.getName());
		repository.save(ingredient);
	}

	@Override
	public IngredientRequest findOneRequest(Integer id) {
		Ingredient ingredient = repository.findOneRequest(id);
		IngredientRequest request = new IngredientRequest();
		request.setId(ingredient.getId());
		request.setName(ingredient.getName());
		return request;
	}

	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}

}
