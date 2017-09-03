package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import ua.entity.Cuisine;
import ua.model.view.CuisineView;

public interface CuisineRepository extends JpaNameRepository<Cuisine>{
		
	@Query("SELECT new ua.model.view.CuisineView(c.id, c.name) FROM Cuisine c")
	List<CuisineView> findAllView();
	
	@Query("SELECT c FROM Cuisine c WHERE c.id=?1")
	Cuisine findOneRequest(Integer id);
}
