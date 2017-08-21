package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import ua.entity.Ingredient;
import ua.model.view.IngredientView;

public interface IngredientRepository extends JpaNameRepository<Ingredient> {

	@Query("SELECT new ua.model.view.IngredientView(i.id, i.name) FROM Ingredient i")
	List<IngredientView> findAllView();
}
