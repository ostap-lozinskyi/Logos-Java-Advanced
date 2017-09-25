package ua.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Order;
import ua.model.view.OrderView;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT new ua.model.view.OrderView(o.id, p.number, o.status) FROM Order o JOIN o.place p")
	List<OrderView> findAllView();
	
	@Query(value = "SELECT new ua.model.view.OrderView(o.id, p.number, o.status) FROM Order o JOIN o.place p",
			countQuery = "SELECT count(o.id) FROM Order o JOIN o.place p")
	Page<OrderView> findAllView(Pageable pageable);
	
	@Query(value = "SELECT new ua.model.view.OrderView(o.id, p.number, o.status) FROM Order o JOIN o.place p WHERE p.id=?1 ORDER BY o.status DESC")
	List<OrderView> findForTable(Integer tableId);

	@Query("SELECT o FROM Order o JOIN FETCH o.place WHERE o.id=?1")
	Order findOneRequest(Integer id);
}
