package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import ua.entity.Ms;
import ua.service.MsService;

@Service
public class MsServiceImpl extends CrudServiceImpl<Ms, Integer> implements MsService {

	@Autowired
	public MsServiceImpl(JpaRepository<Ms, Integer> repository) {
		super(repository);
	}

}
