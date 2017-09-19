package ua.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Meal;

public interface MealRepository extends JpaNameRepository<Meal>, JpaSpecificationExecutor<Meal> {
	
//	@Query("SELECT c.name FROM Cuisine c")
//	List<String> findAllCuisines();
	
//	@Query("SELECT new ua.model.view.ComponentView(com.id, i.name, com.amount, ms.name) FROM Component com JOIN com.ingredient i JOIN com.ms ms")
//	List<ComponentView> findAllComponentsView();
//	
//	@Query("SELECT new ua.model.view.MealView(m.id, m.name, m.fullDescription, m.price, m.weight, cu.name) FROM Meal m JOIN m.cuisine cu")
//	List<MealView> findAllView();
//	
//	@Query(value = "SELECT new ua.model.view.MealView(m.id, m.name, m.fullDescription, m.price, m.weight, cu.name) FROM Meal m JOIN m.cuisine cu",
//			countQuery = "SELECT count(cu.id) FROM Meal m JOIN m.cuisine cu")
//	Page<MealView> findAllView(Pageable pageable);
	
	@Query("SELECT m FROM Meal m JOIN FETCH m.cuisine WHERE m.id=?1")
	Meal findOneRequest(Integer id);
	
	@Query("SELECT m FROM Meal m WHERE m.id=?1")
	Meal findById(Integer id);

}
