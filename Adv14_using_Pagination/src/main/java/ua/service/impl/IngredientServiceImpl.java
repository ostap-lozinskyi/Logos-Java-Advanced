package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	public Page<IngredientView> findAllView(Pageable pageable) {
		return repository.findAllView(pageable);
	}

}
