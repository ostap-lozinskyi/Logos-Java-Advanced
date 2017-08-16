package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import ua.entity.Ingredient;
import ua.service.IngredientService;

@Service
public class IngredientServiceImpl extends CrudServiceImpl<Ingredient, Integer> implements IngredientService {

	@Autowired
	public IngredientServiceImpl(JpaRepository<Ingredient, Integer> repository) {
		super(repository);
	}

}
