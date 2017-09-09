package ua.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ua.entity.Component;
import ua.model.filter.SimpleFilter;
import ua.model.request.ComponentRequest;
import ua.model.view.ComponentView;
import ua.repository.ComponentRepository;
import ua.service.ComponentService;

@Service
public class ComponentServiceImpl implements ComponentService {

	private final ComponentRepository repository;

	@Autowired
	public ComponentServiceImpl(ComponentRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<String> findAllIngredients() {
		return repository.findAllIngredients();
	}

	@Override
	public List<String> findAllMss() {
		return repository.findAllMss();
	}

	@Override
	public Page<ComponentView> findAllView(Pageable pageable) {
		return repository.findAllView(pageable);
	}
	
	@Override
	public Page<Component> findAll(Pageable pageable, SimpleFilter filter) {
		return repository.findAll(filter(filter), pageable);
	}
	
	private Specification<Component> filter(SimpleFilter filter){
		return (root, query, cb) -> {
			if(filter.getSearch().isEmpty()) return null;
			return cb.like(root.get("name"), filter.getSearch()+"%");
		};
	}

	@Override
	public void save(ComponentRequest request) {
		Component component = new Component();
		component.setAmount(new BigDecimal(request.getAmount()));
		component.setId(request.getId());
		component.setIngredient(request.getIngredient());
		component.setMs(request.getMs());
		repository.save(component);
	}

	@Override
	public ComponentRequest findOneRequest(Integer id) {
		Component component = repository.findOneRequest(id);
		ComponentRequest request = new ComponentRequest();
		request.setAmount(String.valueOf(component.getAmount()));
		request.setId(component.getId());
		request.setIngredient(component.getIngredient());
		request.setMs(component.getMs());
		return request;
	}

	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}

}