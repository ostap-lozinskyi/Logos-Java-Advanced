package ua.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Ms;
import ua.model.request.MsRequest;
import ua.model.view.MsView;
import ua.repository.MsRepository;
import ua.service.MsService;

@Service
public class MsServiceImpl implements MsService {

	private final MsRepository repository;

	@Autowired
	public MsServiceImpl(MsRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<MsView> findAllView() {
		return repository.findAllView();
	}

	@Override
	public void save(MsRequest request) {
		Ms ms = new Ms();
		ms.setId(request.getId());
		ms.setName(request.getName());
		repository.save(ms);
	}

	@Override
	public MsRequest findOneRequest(Integer id) {
		Ms ms = repository.findOneRequest(id);
		MsRequest request = new MsRequest();
		request.setId(ms.getId());
		request.setName(ms.getName());
		return request;
	}

	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}
}
