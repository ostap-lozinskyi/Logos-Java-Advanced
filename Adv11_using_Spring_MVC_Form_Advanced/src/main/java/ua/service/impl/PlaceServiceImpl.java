package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Place;
import ua.model.view.PlaceView;
import ua.repository.PlaceRepository;
import ua.service.PlaceService;

@Service
public class PlaceServiceImpl extends CrudServiceImpl<Place, Integer> implements PlaceService {

	private final PlaceRepository repository;

	@Autowired
	public PlaceServiceImpl(PlaceRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public List<PlaceView> findAllView() {
		return repository.findAllView();
	}

}
