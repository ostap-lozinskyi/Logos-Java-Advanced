package ua.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;

import ua.entity.Component;
import ua.service.CuisineService;

public class CuisineServiceImpl extends CrudServiceImpl<Component, Integer> implements CuisineService {

	public CuisineServiceImpl(JpaRepository<Component, Integer> repository) {
		super(repository);
	}

}
