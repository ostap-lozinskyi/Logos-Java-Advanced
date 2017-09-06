package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ua.entity.Ms;
import ua.model.view.MsView;
import ua.repository.MsRepository;
import ua.service.MsService;

@Service
public class MsServiceImpl extends CrudServiceImpl<Ms, Integer> implements MsService {

	private final MsRepository repository;

	@Autowired
	public MsServiceImpl(MsRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public Page<MsView> findAllView(Pageable pageable) {
		return repository.findAllView(pageable);
	}

}
