package ua.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Ingredient;
import ua.model.view.IngredientView;

public interface IngredientRepository extends JpaNameRepository<Ingredient> {

	@Query("SELECT new ua.model.view.IngredientView(i.id, i.name) FROM Ingredient i")
	List<IngredientView> findAllView();
	
	@Query(value = "SELECT new ua.model.view.IngredientView(i.id, i.name) FROM Ingredient i", 
			countQuery = "SELECT count(i.id) FROM Ingredient i")
	Page<IngredientView> findAllView(Pageable pageable);
	
	@Query("SELECT i FROM Ingredient i WHERE i.id=?1")
	Ingredient findOneRequest(Integer id);
}
