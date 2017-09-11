package ua.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ua.entity.Meal;
import ua.model.filter.MealFilter;
import ua.model.request.MealRequest;
import ua.model.view.ComponentView;
import ua.model.view.MealIndexView;
import ua.model.view.MealView;
import ua.repository.MealRepository;
import ua.repository.MealViewRepository;
import ua.service.MealService;

@Service
public class MealServiceImpl implements MealService {

	private final MealRepository repository;
	
	private final MealViewRepository mealViewrepository;

	@Autowired
	public MealServiceImpl(MealRepository repository, MealViewRepository mealViewrepository) {
		this.repository = repository;
		this.mealViewrepository = mealViewrepository;
	}

	@Override
	public List<String> findAllcuisines() {
		return repository.findAllCuisines();
	}

	@Override
	public List<ComponentView> findAllСomponentsView() {
		return repository.findAllComponentsView();
	}

	@Override
	public Page<MealView> findAllView(Pageable pageable) {
		return repository.findAllView(pageable);
	}
	
	@Override
	public Page<MealIndexView> findAll(MealFilter filter, Pageable pageable) {
		return mealViewrepository.findAll(filter, pageable);
	}

	@Override
	public void save(MealRequest request) {
		Meal meal = new Meal();
		meal.setCuisine(request.getCuisine());
		meal.setFullDescription(request.getFullDescription());
		meal.setShortDescription(request.getShortDescription());
		meal.setId(request.getId());
		meal.setName(request.getName());
		meal.setPrice(new BigDecimal(request.getPrice()));
		meal.setWeight(Integer.valueOf(request.getWeight()));
		meal.setComponents(request.getComponents());
		repository.save(meal);
	}

	@Override
	public MealRequest findOneRequest(Integer id) {
		Meal meal = repository.findOneRequest(id);
		MealRequest request = new MealRequest();
		request.setCuisine(meal.getCuisine());
		request.setFullDescription(meal.getFullDescription());
		request.setShortDescription(meal.getShortDescription());
		request.setId(meal.getId());
		request.setName(meal.getName());
		request.setPrice(meal.getPrice().toString());
		request.setWeight(String.valueOf(meal.getWeight()));
		request.setComponents(meal.getComponents());
		return request;
	}

	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}

}
