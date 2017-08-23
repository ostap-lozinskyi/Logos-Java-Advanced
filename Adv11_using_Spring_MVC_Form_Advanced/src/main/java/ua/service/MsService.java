package ua.service;

import java.util.List;

import ua.entity.Ms;
import ua.model.view.MsView;

public interface MsService extends CrudService<Ms, Integer> {
	
	List<MsView> findAllView();

}
