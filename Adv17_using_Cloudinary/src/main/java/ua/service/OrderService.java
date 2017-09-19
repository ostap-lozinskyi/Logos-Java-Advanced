package ua.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.model.request.OrderRequest;
import ua.model.view.OrderView;
import ua.model.view.PlaceView;

public interface OrderService {

	List<String> findAllMeals();

	List<PlaceView> findAllPlaceViews();

	Page<OrderView> findAllView(Pageable pageable);

	void save(OrderRequest request);

	OrderRequest findOneRequest(Integer id);

	void delete(Integer id);

}
