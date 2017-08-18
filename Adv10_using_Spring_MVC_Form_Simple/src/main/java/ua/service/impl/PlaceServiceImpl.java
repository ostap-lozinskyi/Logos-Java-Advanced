package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import ua.entity.Place;
import ua.service.PlaceService;

@Service
public class PlaceServiceImpl extends CrudServiceImpl<Place, Integer> implements PlaceService {

	@Autowired
	public PlaceServiceImpl(JpaRepository<Place, Integer> repository) {
		super(repository);
	}

}
