package ua.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.model.filter.PlaceFilter;
import ua.model.request.PlaceRequest;
import ua.model.view.PlaceView;

public interface PlaceService {

	Page<PlaceView> findAllView(Pageable pageable, PlaceFilter filter);
	
	List<PlaceView> findAllPlaces();
	
	public List<String> findAllPlacesCountOfPeople();

	void save(PlaceRequest request);

	PlaceRequest findOneRequest(Integer id);

	void delete(Integer id);

	void updateUserId(Integer placeId, Integer userId);
	
}
