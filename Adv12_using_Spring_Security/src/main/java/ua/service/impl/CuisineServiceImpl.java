package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Cuisine;
import ua.model.view.CuisineView;
import ua.repository.CuisineRepository;
import ua.service.CuisineService;

@Service
public class CuisineServiceImpl extends CrudServiceImpl<Cuisine, Integer> implements CuisineService {

	private final CuisineRepository repository;

	@Autowired
	public CuisineServiceImpl(CuisineRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public List<CuisineView> findAllView() {
		return repository.findAllView();
	}

}
