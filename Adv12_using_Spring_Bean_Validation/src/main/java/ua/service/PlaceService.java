package ua.service;

import java.util.List;

import ua.model.request.PlaceRequest;
import ua.model.view.PlaceView;

public interface PlaceService {

	List<PlaceView> findAllView();

	void save(PlaceRequest request);

	PlaceRequest findOneRequest(Integer id);

	void delete(Integer id);
}
