package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ua.entity.Order;
import ua.model.filter.OrderFilter;
import ua.model.request.OrderRequest;
import ua.model.view.OrderView;
import ua.model.view.PlaceView;
import ua.repository.MealRepository;
import ua.repository.OrderRepository;
import ua.repository.OrderViewRepository;
import ua.repository.PlaceRepository;
import ua.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	private final OrderRepository repository;
	
	private final OrderViewRepository orderViewRepository;
	
	private final MealRepository mealRepository;
	
	private final PlaceRepository placeRepository;

	@Autowired
	public OrderServiceImpl(OrderRepository repository, OrderViewRepository orderViewRepository,
			MealRepository mealRepository, PlaceRepository placeRepository) {
		this.repository = repository;
		this.orderViewRepository = orderViewRepository;
		this.mealRepository = mealRepository;
		this.placeRepository = placeRepository;
	}

	@Override
	public List<String> findAllMeals() {
		return mealRepository.findAllMeals();
	}

	

	@Override
	public List<PlaceView> findAllPlace() {
		return placeRepository.findAllPlaceViews();
	}
	
	@Override
	public PlaceView findPlaceById(Integer id) {
		return placeRepository.findViewById(id);
	}

	@Override
	public Page<OrderView> findAll(Pageable pageable, OrderFilter filter) {
		return orderViewRepository.findAllView(filter, pageable);
	}
	
	@Override
	public List<OrderView> findForTable(Integer tableId) {
		return repository.findForTable(tableId);
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
