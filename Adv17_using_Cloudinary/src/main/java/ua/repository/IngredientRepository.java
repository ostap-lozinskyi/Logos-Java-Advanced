package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Ingredient;

public interface IngredientRepository extends JpaNameRepository<Ingredient>, JpaSpecificationExecutor<Ingredient> {

	@Query("SELECT i.name FROM Ingredient i")
	List<String> findAllNames();
}
