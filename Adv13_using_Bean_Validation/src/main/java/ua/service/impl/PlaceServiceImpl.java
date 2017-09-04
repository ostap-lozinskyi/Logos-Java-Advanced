package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Place;
import ua.model.request.PlaceRequest;
import ua.model.view.PlaceView;
import ua.repository.PlaceRepository;
import ua.service.PlaceService;

@Service
public class PlaceServiceImpl implements PlaceService {

	private final PlaceRepository repository;

	@Autowired
	public PlaceServiceImpl(PlaceRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<PlaceView> findAllView() {
		return repository.findAllView();
	}

	@Override
	public void save(PlaceRequest request) {
		Place place = new Place();
		place.setCountOfPeople(Integer.valueOf(request.getCountOfPeople()));
		place.setId(request.getId());
		place.setNumber(Integer.valueOf(request.getNumber()));
		repository.save(place);
	}

	@Override
	public PlaceRequest findOneRequest(Integer id) {
		Place place = repository.findOneRequest(id);
		PlaceRequest request = new PlaceRequest();
		request.setCountOfPeople(String.valueOf(place.getCountOfPeople()));
		request.setId(place.getId());
		request.setNumber(String.valueOf(place.getNumber()));
		return request;
	}

	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}

}
