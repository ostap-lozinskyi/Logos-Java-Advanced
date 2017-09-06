package ua.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ua.entity.Ms;
import ua.model.view.MsView;

public interface MsService extends CrudService<Ms, Integer> {

	Page<MsView> findAllView(Pageable pageable);

}
