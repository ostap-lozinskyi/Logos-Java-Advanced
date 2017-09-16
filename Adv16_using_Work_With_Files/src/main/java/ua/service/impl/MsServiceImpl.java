package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import ua.entity.Ms;
import ua.model.filter.SimpleFilter;
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
	public Page<Ms> findAll(Pageable pageable, SimpleFilter filter) {
		return repository.findAll(filter(filter), pageable);
	}
	
	private Specification<Ms> filter(SimpleFilter filter){
		return (root, query, cb) -> {
			if(filter.getSearch().isEmpty()) return null;
			return cb.like(root.get("name"), filter.getSearch()+"%");
		};
	}

}
