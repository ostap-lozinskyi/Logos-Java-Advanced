package ua.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.model.request.PlaceRequest;
import ua.model.view.PlaceView;

public interface PlaceService {

	Page<PlaceView> findAll(Pageable pageable);

	void save(PlaceRequest request);

	PlaceRequest findOneRequest(Integer id);

	void delete(Integer id);
}
