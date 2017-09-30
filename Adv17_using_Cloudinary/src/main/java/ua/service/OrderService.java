package ua.service;

import java.security.Principal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.entity.Order;
import ua.model.filter.OrderFilter;
import ua.model.request.OrderRequest;
import ua.model.view.MealView;
import ua.model.view.OrderView;
import ua.model.view.PlaceView;

public interface OrderService {

	List<String> findAllMeals();
	
	List<String> findStatusForSearch();

	List<PlaceView> findAllPlace();
	
	PlaceView findPlaceById(Integer id);

	Page<OrderView> findAll(Pageable pageable, OrderFilter filter);
	
	List<OrderView> findForTable(Integer tableId);
	
	List<MealView> findForOrder(Integer orderId);
	
	Order findOrderById(Integer id);
	
	List<Order> findOrderByPlaceId(Integer id);

	void save(OrderRequest request, Principal principal);

	OrderRequest findOneRequest(Integer id);

	void delete(Integer id);
	
	void updateStatus(Integer id, String newStatus);
	
}
