package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ua.entity.User;
import ua.model.view.MealView;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmail(String email);

	boolean existsByEmail(String email);
	
	@Query("SELECT m.id FROM User u JOIN u.meals m WHERE u.id=?1")
	List<Integer> findMealByUserId(Integer id);
	
	@Query("SELECT new ua.model.view.MealView(m.id, m.photoUrl, m.version, m.name, m.fullDescription, m.price, m.weight, c.name, m.rate) FROM User u JOIN u.meals m JOIN m.cuisine c WHERE u.id=?1")
	List<MealView> findUserMealsIds(Integer userId);
	
}
