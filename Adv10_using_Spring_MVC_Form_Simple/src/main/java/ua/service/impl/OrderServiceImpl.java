package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import ua.entity.Order;
import ua.service.OrderService;

@Service
public class OrderServiceImpl extends CrudServiceImpl<Order, Integer> implements OrderService {

	@Autowired
	public OrderServiceImpl(JpaRepository<Order, Integer> repository) {
		super(repository);
	}

}
