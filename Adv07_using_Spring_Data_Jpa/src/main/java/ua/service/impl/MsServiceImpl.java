package ua.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;

import ua.entity.Component;
import ua.service.MsService;

public class MsServiceImpl extends CrudServiceImpl<Component, Integer> implements MsService {

	public MsServiceImpl(JpaRepository<Component, Integer> repository) {
		super(repository);
	}

}
