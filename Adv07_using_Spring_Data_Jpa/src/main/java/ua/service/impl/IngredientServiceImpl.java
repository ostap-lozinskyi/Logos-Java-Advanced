package ua.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;

import ua.entity.Component;
import ua.service.IngredientService;

public class IngredientServiceImpl extends CrudServiceImpl<Component, Integer> implements IngredientService {

	public IngredientServiceImpl(JpaRepository<Component, Integer> repository) {
		super(repository);
	}

}
