package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Order;
import ua.model.view.OrderView;
import ua.model.view.PlaceView;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT m.name FROM Meal m")
	List<String> findAllMeals();

	@Query("SELECT new ua.model.view.PlaceView(p.id, p.countOfPeople, p.number) FROM Place p")
	List<PlaceView> findAllPlaceViews();

	@Query("SELECT new ua.model.view.OrderView(o.id, p.number) FROM Order o JOIN o.place p")
	List<OrderView> findAllView();

	@Query("SELECT o FROM Order o JOIN FETCH o.place WHERE o.id=?1")
	Order findOneRequest(Integer id);
}
