package ua.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Place;
import ua.model.view.PlaceView;

public interface PlaceRepository extends JpaRepository<Place, Integer> {

	@Query("SELECT new ua.model.view.PlaceView(p.id, p.countOfPeople, p.number) FROM Place p")
	List<PlaceView> findAllView();
	
	@Query(value = "SELECT new ua.model.view.PlaceView(p.id, p.countOfPeople, p.number) FROM Place p",
			countQuery = "SELECT count(p.id) FROM Place p")
	Page<PlaceView> findAllView(Pageable pageable);
	
	@Query("SELECT p FROM Place p WHERE p.id=?1")
	Place findOneRequest(Integer id);
	
	boolean existsByNumber(Integer number);
}
