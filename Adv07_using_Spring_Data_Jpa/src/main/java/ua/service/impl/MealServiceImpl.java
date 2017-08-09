package ua.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;

import ua.entity.Component;
import ua.service.MealService;

public class MealServiceImpl extends CrudServiceImpl<Component, Integer> implements MealService {

	public MealServiceImpl(JpaRepository<Component, Integer> repository) {
		super(repository);
	}

}
