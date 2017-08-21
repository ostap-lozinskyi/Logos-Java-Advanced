package ua.service;

import java.util.List;

import ua.entity.Order;
import ua.model.view.OrderView;

public interface OrderService extends CrudService<Order, Integer> {
	
	List<String> findAllMeals();

	List<String> findAllPlaces();

	List<OrderView> findAllView();
}
