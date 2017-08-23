package ua.service;

import java.util.List;

import ua.entity.Place;
import ua.model.view.PlaceView;

public interface PlaceService extends CrudService<Place, Integer> {

	List<PlaceView> findAllView();
}
