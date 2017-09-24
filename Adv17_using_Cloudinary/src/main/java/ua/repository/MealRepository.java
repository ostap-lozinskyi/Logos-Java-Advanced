package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Meal;
import ua.model.view.MealIndexView;

public interface MealRepository extends JpaNameRepository<Meal>, JpaSpecificationExecutor<Meal> {
	
	@Query("SELECT m.name FROM Meal m")
	List<String> findAllMeals();
	
	@Query("SELECT new ua.model.view.MealIndexView(m.id, m.photoUrl, m.version, m.rate, m.price, m.weight, m.name, m.shortDescription) FROM Meal m ORDER BY m.rate DESC")
	List<MealIndexView> find5MealsByRate();
	
	@Query("SELECT m FROM Meal m JOIN FETCH m.cuisine WHERE m.id=?1")
	Meal findOneRequest(Integer id);
	
	@Query("SELECT m FROM Meal m WHERE m.id=?1")
	Meal findById(Integer id);

}
