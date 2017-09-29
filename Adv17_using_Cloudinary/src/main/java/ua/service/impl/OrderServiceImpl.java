package ua.service.impl;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ua.entity.Meal;
import ua.entity.Order;
import ua.entity.User;
import ua.model.filter.OrderFilter;
import ua.model.request.OrderRequest;
import ua.model.view.MealView;
import ua.model.view.OrderView;
import ua.model.view.PlaceView;
import ua.repository.MealRepository;
import ua.repository.OrderRepository;
import ua.repository.OrderViewRepository;
import ua.repository.PlaceRepository;
import ua.repository.UserRepository;
import ua.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	private final OrderRepository repository;
	
	private final OrderViewRepository orderViewRepository;
	
	private final MealRepository mealRepository;
	
	private final PlaceRepository placeRepository;
	
	private final UserRepository userRepository;

	@Autowired
	public OrderServiceImpl(OrderRepository repository, OrderViewRepository orderViewRepository,
			MealRepository mealRepository, PlaceRepository placeRepository, UserRepository userRepository) {
		this.repository = repository;
		this.orderViewRepository = orderViewRepository;
		this.mealRepository = mealRepository;
		this.placeRepository = placeRepository;
		this.userRepository = userRepository;
	}

	@Override
	public List<String> findAllMeals() {
		return mealRepository.findAllMeals();
	}
	
	@Override
	public List<String> findStatusForSearch() {
		return repository.findStatusForSearch();
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
		Page<OrderView> ordersPage = orderViewRepository.findAllView(filter, pageable);
		for (OrderView orderView : ordersPage) {
			orderView.setMealViews(findForOrder(orderView.getId()));
		}
		return ordersPage;
	}
	
	@Override
	public List<OrderView> findForTable(Integer tableId) {
		List<OrderView> ordersPage = repository.findForTable(tableId);
		for (OrderView orderView : ordersPage) {
			orderView.setMealViews(findForOrder(orderView.getId()));
		}
		return ordersPage;
	}
	
	@Override
	public List<MealView> findForOrder(Integer orderId) {
		return mealRepository.findForOrder(orderId);
	}

	@Override
	public void save(OrderRequest request, Principal principal) {
		Order order = new Order();
		order.setId(request.getId());
		order.setPlace(request.getPlace());
		order.setMeals(request.getMeals());
		order.setStatus(request.getStatus());
		
		String email = principal.getName();
		User user=userRepository.findByEmail(email);		
		List<Meal> userMeals = user.getMeals();
		List<Meal> orderMeals = order.getMeals();
		for (Meal meal : orderMeals) {
			if (!userMeals.contains(meal))
				userMeals.add(meal);
		}		
		user.setMeals(userMeals);
		userRepository.save(user);
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
	
	@Override
	public void updateStatus(Integer id, String newStatus) {
		Order order = repository.findById(id);
		order.setStatus(newStatus);
		repository.save(order);
	}

}
