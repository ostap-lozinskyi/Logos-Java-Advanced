package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ua.entity.Ingredient;
import ua.model.filter.SimpleFilter;
import ua.model.view.ComponentView;
import ua.model.view.IngredientView;
import ua.repository.ComponentRepository;
import ua.repository.IngredientRepository;
import ua.service.IngredientService;

@Service
public class IngredientServiceImpl extends CrudServiceImpl<Ingredient, Integer> implements IngredientService {

	private final IngredientRepository repository;
	
	private final ComponentRepository componentRepository;

	@Autowired
	public IngredientServiceImpl(IngredientRepository repository, ComponentRepository componentRepository) {
		super(repository);
		this.repository = repository;
		this.componentRepository = componentRepository;
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

}
