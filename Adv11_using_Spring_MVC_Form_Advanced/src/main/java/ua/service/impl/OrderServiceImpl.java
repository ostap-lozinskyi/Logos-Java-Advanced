package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Order;
import ua.model.view.OrderView;
import ua.repository.OrderRepository;
import ua.service.OrderService;

@Service
public class OrderServiceImpl extends CrudServiceImpl<Order, Integer> implements OrderService {

	private final OrderRepository repository;

	@Autowired
	public OrderServiceImpl(OrderRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public List<String> findAllMeals() {
		return repository.findAllMeals();
	}

	@Override
	public List<String> findAllPlaces() {
		return repository.findAllPlaces();
	}

	@Override
	public List<OrderView> findAllView() {
		return repository.findAllView();
	}

}
