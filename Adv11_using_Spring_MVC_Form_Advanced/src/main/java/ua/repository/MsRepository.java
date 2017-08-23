package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import ua.entity.Ms;
import ua.model.view.MsView;

public interface MsRepository extends JpaNameRepository<Ms>{
	
	@Query("SELECT new ua.model.view.MsView(m.id, m.name) FROM Ms m")
	List<MsView> findAllView();

}
