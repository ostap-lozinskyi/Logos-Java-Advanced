package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ua.entity.Comment;
import ua.entity.Ingredient;
import ua.model.filter.SimpleFilter;
import ua.model.view.ComponentView;
import ua.model.view.IngredientView;
import ua.model.view.MealView;
import ua.repository.ComponentRepository;
import ua.repository.IngredientRepository;
import ua.repository.MealRepository;
import ua.service.IngredientService;

@Service
public class IngredientServiceImpl extends CrudServiceImpl<Ingredient, Integer> implements IngredientService {

	private final IngredientRepository repository;
	
	private final ComponentRepository componentRepository;
	
	private final MealRepository mealRepository;

	@Autowired
	public IngredientServiceImpl(IngredientRepository repository, ComponentRepository componentRepository,
			MealRepository mealRepository) {
		super(repository);
		this.repository = repository;
		this.componentRepository = componentRepository;
		this.mealRepository = mealRepository;
	}

	@Override
	public Page<Ingredient> findAll(Pageable pageable, SimpleFilter filter) {
		return repository.findAll(filter(filter), pageable);
	}
	
	private Specification<Ingredient> filter(SimpleFilter filter){
		return (root, query, cb) -> {
			if(filter.getSearch().isEmpty()) return null;
			return cb.like(root.get("name"), filter.getSearch()+"%");
		};
	}
	
	@Override
	public IngredientView findById(Integer id) {
		return repository.findViewById(id);
	}
	
	@Override
	public List<ComponentView> findComponent(Integer id) {
		return componentRepository.findByIngredientId(id);
	}
	
	@Override
	public List<MealView> findMeal(List<Integer> id) {
		return mealRepository.findByComponentId(id);
	}
	
	@Override
	public void updateComments(Integer id, Comment newComment) {
		Ingredient ingredient = repository.findById(id);
		List<Comment> comments = ingredient.getComments();
		comments.add(newComment);
		ingredient.setComments(comments);
		repository.save(ingredient);
		System.out.println(ingredient.getComments());
	}
	
	@Override
	public List<Comment> findCommentList(Integer id) {
		return repository.findCommentList(id);
	}

}
