package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import ua.entity.Meal;
import ua.model.view.MealView;

public interface MealRepository extends JpaNameRepository<Meal> {
	
	@Query("SELECT c.name FROM Cuisine c")
	List<String> findAllCuisines();
	
	@Query("SELECT com.id FROM Component com")
	List<String> findAllConponents();

	@Query("SELECT new ua.model.view.MealView(m.id, m.name, m.fullDescription, m.price, m.weight, cu.name) FROM Meal m JOIN m.cuisine cu")
	List<MealView> findAllView();
}
