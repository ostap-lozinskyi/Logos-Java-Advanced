package ua.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;

import ua.entity.Component;
import ua.service.PlaceService;

public class PlaceServiceImpl extends CrudServiceImpl<Component, Integer> implements PlaceService {

	public PlaceServiceImpl(JpaRepository<Component, Integer> repository) {
		super(repository);
	}

}
