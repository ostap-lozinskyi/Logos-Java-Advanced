package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Cuisine;
import ua.model.request.CuisineRequest;
import ua.model.view.CuisineView;
import ua.repository.CuisineRepository;
import ua.service.CuisineService;

@Service
public class CuisineServiceImpl implements CuisineService {

	private final CuisineRepository repository;

	@Autowired
	public CuisineServiceImpl(CuisineRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<CuisineView> findAllView() {
		return repository.findAllView();
	}

	@Override
	public void save(CuisineRequest request) {
		Cuisine cuisine = new Cuisine();
		cuisine.setId(request.getId());
		cuisine.setName(request.getName());
		repository.save(cuisine);
	}

	@Override
	public CuisineRequest findOneRequest(Integer id) {
		Cuisine cuisine = repository.findOneRequest(id);
		CuisineRequest request = new CuisineRequest();
		request.setId(cuisine.getId());
		request.setName(cuisine.getName());
		return request;
	}

	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}

}
