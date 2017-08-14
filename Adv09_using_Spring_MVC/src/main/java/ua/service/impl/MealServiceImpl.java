package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import ua.entity.Meal;
import ua.service.MealService;

@Service
public class MealServiceImpl extends CrudServiceImpl<Meal, Integer> implements MealService {

	@Autowired
	public MealServiceImpl(JpaRepository<Meal, Integer> repository) {
		super(repository);
	}

}
