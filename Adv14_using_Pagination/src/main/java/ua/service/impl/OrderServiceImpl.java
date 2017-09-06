package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Order;
import ua.model.request.OrderRequest;
import ua.model.view.OrderView;
import ua.model.view.PlaceView;
import ua.repository.OrderRepository;
import ua.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	private final OrderRepository repository;

	@Autowired
	public OrderServiceImpl(OrderRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<String> findAllMeals() {
		return repository.findAllMeals();
	}
	
	@Override
	public List<PlaceView> findAllPlaceViews() {
		return repository.findAllPlaceViews();
	}

	@Override
	public List<OrderView> findAllView() {
		return repository.findAllView();
	}

	@Override
	public void save(OrderRequest request) {
		Order order = new Order();
		order.setId(request.getId());
		order.setPlace(request.getPlace());
		order.setMeals(request.getMeals());
		repository.save(order);
	}

	@Override
	public OrderRequest findOneRequest(Integer id) {
		Order order = repository.findOneRequest(id);
		OrderRequest request = new OrderRequest();
		request.setId(order.getId());
		request.setPlace(order.getPlace());
		request.setMeals(order.getMeals());
		return request;
	}

	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}

}
