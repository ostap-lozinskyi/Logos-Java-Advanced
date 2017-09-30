package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ua.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmail(String email);

	boolean existsByEmail(String email);
	
	@Query("SELECT m.id FROM User u JOIN u.meals m WHERE u.id=?1")
	List<Integer> findMealByUserId(Integer id);
	
	@Query("SELECT m.id FROM User u JOIN u.meals m WHERE u.id=?1")
	List<Integer> findUserMealsIds(Integer userId);
	
}
