package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import ua.entity.Cuisine;
import ua.service.CuisineService;

@Service
public class CuisineServiceImpl extends CrudServiceImpl<Cuisine, Integer> implements CuisineService {

	@Autowired
	public CuisineServiceImpl(JpaRepository<Cuisine, Integer> repository) {
		super(repository);
	}

}
