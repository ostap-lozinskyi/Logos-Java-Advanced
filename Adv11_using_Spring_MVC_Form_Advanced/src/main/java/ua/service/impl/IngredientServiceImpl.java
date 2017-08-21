package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Ingredient;
import ua.model.view.IngredientView;
import ua.repository.IngredientRepository;
import ua.service.IngredientService;

@Service
public class IngredientServiceImpl extends CrudServiceImpl<Ingredient, Integer> implements IngredientService {

	private final IngredientRepository repository;

	@Autowired
	public IngredientServiceImpl(IngredientRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public List<IngredientView> findAllView() {
		return repository.findAllView();
	}

}
