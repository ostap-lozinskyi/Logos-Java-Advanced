package ua.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Cuisine;
import ua.model.view.CuisineView;

public interface CuisineRepository extends JpaNameRepository<Cuisine>{
		
	@Query("SELECT new ua.model.view.CuisineView(c.id, c.name) FROM Cuisine c")
	List<CuisineView> findAllView();
	
	@Query(value = "SELECT new ua.model.view.CuisineView(c.id, c.name) FROM Cuisine c", 
			countQuery = "SELECT count(c.id) FROM Cuisine c")
	Page<CuisineView> findAllView(Pageable pageable);
	
	@Query("SELECT c FROM Cuisine c WHERE c.id=?1")
	Cuisine findOneRequest(Integer id);
}
