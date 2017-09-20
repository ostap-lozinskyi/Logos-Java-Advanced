package ua.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ua.entity.Meal;
import ua.model.filter.MealFilter;
import ua.model.filter.SimpleFilter;
import ua.model.request.MealRequest;
import ua.model.view.ComponentView;
import ua.model.view.MealIndexView;
import ua.repository.ComponentRepository;
import ua.repository.CuisineRepository;
import ua.repository.MealRepository;
import ua.repository.MealViewRepository;
import ua.service.MealService;

@Service
public class MealServiceImpl implements MealService {

	private final MealRepository repository;
	
	private final MealViewRepository mealViewrepository;
	
	private final CuisineRepository cuisineRepository;
	
	private final ComponentRepository componentRepository;

	@Autowired
	public MealServiceImpl(MealRepository repository, MealViewRepository mealViewrepository, 
			CuisineRepository cuisineRepository, ComponentRepository componentRepository) {
		this.repository = repository;
		this.mealViewrepository = mealViewrepository;
		this.cuisineRepository = cuisineRepository;
		this.componentRepository = componentRepository;
	}

	@Override
	public List<String> findAllcuisines() {
		return cuisineRepository.findAllNames();
	}

	@Override
	public List<ComponentView> findAllСomponents() {
		return componentRepository.findAllView();
	}

	@Override
	public Page<Meal> findAll(Pageable pageable, SimpleFilter filter) {
		return repository.findAll(filter(filter), pageable);
	}
	
	private Specification<Meal> filter(SimpleFilter filter){
		return (root, query, cb) -> {
			if(filter.getSearch().isEmpty()) return null;
			return cb.like(root.get("name"), filter.getSearch()+"%");
		};
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
		meal.setPhotoUrl(request.getPhotoUrl());
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
		request.setPhotoUrl(meal.getPhotoUrl());
		return request;
	}

	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}
	
	@Override
	public void updatePhotoUrl(Integer id, String newPhotoUrl) {
		Meal meal = repository.findById(id);
		String oldPhotoUrl=meal.getPhotoUrl();
		if ((oldPhotoUrl != null)&&(oldPhotoUrl.equals(newPhotoUrl))) {			
			meal.setVersion(meal.getVersion()+1);
		} else {
			meal.setVersion(0);
		}
		meal.setPhotoUrl(newPhotoUrl);
		repository.save(meal);		
	}
	
	@Override
	public void updateRate(Integer id, BigDecimal newRate) {
		Meal meal = repository.findById(id);
		meal.setRate(newRate);
		repository.save(meal);		
	}
	
	public Meal findById(Integer id) {
		return repository.findById(id);
	}

}
