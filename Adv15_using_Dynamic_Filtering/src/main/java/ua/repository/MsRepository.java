package ua.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import ua.entity.Ms;

public interface MsRepository extends JpaNameRepository<Ms>, JpaSpecificationExecutor<Ms> {
	
//	@Query("SELECT new ua.model.view.MsView(m.id, m.name) FROM Ms m")
//	List<MsView> findAllView();
//	
//	@Query(value = "SELECT new ua.model.view.MsView(m.id, m.name) FROM Ms m",
//			countQuery = "SELECT count(m.id) FROM Ms m")
//	Page<MsView> findAllView(Pageable pageable);
//	
//	@Query("SELECT m FROM Ms m WHERE m.id=?1")
//	Ms findOneRequest(Integer id);
	
	@Query("SELECT ms.name FROM Ms ms")
	List<String> findAllNames();

}
