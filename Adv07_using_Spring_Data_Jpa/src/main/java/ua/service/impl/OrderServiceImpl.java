package ua.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;

import ua.entity.Component;
import ua.service.OrderService;

public class OrderServiceImpl extends CrudServiceImpl<Component, Integer> implements OrderService {

	public OrderServiceImpl(JpaRepository<Component, Integer> repository) {
		super(repository);
	}

}
