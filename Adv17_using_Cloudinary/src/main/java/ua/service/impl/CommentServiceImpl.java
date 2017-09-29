package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Comment;
import ua.repository.CommentRepository;
import ua.service.CommentService;

@Service
public class CommentServiceImpl extends CrudServiceImpl<Comment, Integer> implements CommentService {

	private final CommentRepository repository;

	@Autowired
	public CommentServiceImpl(CommentRepository repository) {
		super(repository);
		this.repository = repository;
	}	

//	@Override
//	public Page<Cuisine> findAll(Pageable pageable, SimpleFilter filter) {
//		return repository.findAll(filter(filter), pageable);
//	}
//	
//	private Specification<Cuisine> filter(SimpleFilter filter){
//		return (root, query, cb) -> {
//			if(filter.getSearch().isEmpty()) return null;
//			return cb.like(root.get("name"), filter.getSearch()+"%");
//		};
//	}

}
