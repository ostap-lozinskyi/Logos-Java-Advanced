package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ua.entity.Place;
import ua.entity.User;
import ua.model.filter.PlaceFilter;
import ua.model.request.PlaceRequest;
import ua.model.view.PlaceView;
import ua.repository.PlaceRepository;
import ua.repository.PlaceViewRepository;
import ua.repository.UserRepository;
import ua.service.PlaceService;

@Service
public class PlaceServiceImpl implements PlaceService {

	private final PlaceRepository repository;

	private final PlaceViewRepository placeViewRepository;
	
	private final UserRepository userRepository;

	@Autowired
	public PlaceServiceImpl(PlaceRepository repository, PlaceViewRepository placeViewRepository,
			UserRepository userRepository) {
		this.repository = repository;
		this.placeViewRepository = placeViewRepository;
		this.userRepository = userRepository;
	}

	@Override
	public Page<PlaceView> findAllView(Pageable pageable, PlaceFilter filter) {
		return placeViewRepository.findAllView(filter, pageable);
	}
	
	@Override
	public List<String> findAllPlacesCountOfPeople() {
		return repository.findAllPlacesCountOfPeople();
	}
	
	@Override
	public List<PlaceView> findAllPlaces() {
		return repository.findAllPlaceViews();
	}

	@Override
	public void save(PlaceRequest request) {
		Place place = new Place();
		place.setCountOfPeople(Integer.valueOf(request.getCountOfPeople()));
		place.setId(request.getId());
		place.setNumber(Integer.valueOf(request.getNumber()));
		place.setFree(true);
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
	
	@Override
	public void updateUserId(Integer placeId, Integer userId) {
		Place place = repository.findById(placeId);
		User user = userRepository.findOne(userId);
		place.setUser(user);
		if (place.getUser() == null) {
			place.setFree(true);
		} else {
			place.setFree(false);
		}		
		repository.save(place);		
	}

}
