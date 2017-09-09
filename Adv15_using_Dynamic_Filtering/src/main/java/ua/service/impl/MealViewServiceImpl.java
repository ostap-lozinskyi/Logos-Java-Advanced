package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ua.model.filter.MealFilter;
import ua.model.view.MealIndexView;
import ua.repository.MealRepository;
import ua.repository.MealViewRepository;
import ua.service.MealViewService;

@Service
public class MealViewServiceImpl implements MealViewService {

	private final MealViewRepository repository;
	
	private final MealRepository mealRepository;

	@Autowired
	public MealViewServiceImpl(MealViewRepository repository, MealRepository mealRepository) {
		this.repository = repository;
		this.mealRepository = mealRepository;
	}

	@Override
	public Page<MealIndexView> findAll(MealFilter filter, Pageable pageable) {
		return repository.findAll(filter, pageable);
	}
	
	@Override
	public List<String> findAllCuisines() {
		return mealRepository.findAllCuisines();
	}	

}
