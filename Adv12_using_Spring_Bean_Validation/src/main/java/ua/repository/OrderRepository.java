package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Order;
import ua.model.view.OrderView;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT m.name FROM Meal m")
	List<String> findAllMeals();

	@Query("SELECT p.id FROM Place p")
	List<String> findAllPlaces();

	@Query("SELECT new ua.model.view.OrderView(o.id) FROM Order o")
	List<OrderView> findAllView();

	@Query("SELECT o FROM Order o JOIN FETCH o.place WHERE o.id=?1")
	Order findOneRequest(Integer id);
}
