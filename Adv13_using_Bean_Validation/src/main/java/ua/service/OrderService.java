package ua.service;

import java.util.List;

import ua.model.request.OrderRequest;
import ua.model.view.OrderView;
import ua.model.view.PlaceView;

public interface OrderService {

	List<String> findAllMeals();
	
	List<PlaceView> findAllPlaces();

	List<OrderView> findAllView();

	void save(OrderRequest request);

	OrderRequest findOneRequest(Integer id);

	void delete(Integer id);

}
