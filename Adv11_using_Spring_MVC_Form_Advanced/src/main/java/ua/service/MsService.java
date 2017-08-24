package ua.service;

import java.util.List;

import ua.model.request.MsRequest;
import ua.model.view.MsView;

public interface MsService {
	
	List<MsView> findAllView();
	
	void save(MsRequest request);

	MsRequest findOneRequest(Integer id);

	void delete(Integer id);

}
