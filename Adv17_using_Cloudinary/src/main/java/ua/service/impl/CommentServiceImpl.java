package ua.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ua.entity.Comment;
import ua.model.request.CommentRequest;
import ua.repository.CommentRepository;
import ua.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

	private final CommentRepository repository;

	@Autowired
	public CommentServiceImpl(CommentRepository repository) {
		this.repository = repository;
	}	

	@Override
	public Integer save(CommentRequest request) {
		Comment comment = new Comment();
		comment.setText(request.getText());
		repository.save(comment);
		System.out.println(comment.getId());
		return comment.getId();
	}

	@Override
	public CommentRequest findOneRequest(Integer id) {
		Comment comment = repository.findOneRequest(id);
		CommentRequest request = new CommentRequest();
		request.setId(comment.getId());
		request.setText(comment.getText());
		return request;
	}
	
	@Override
	public Comment findById(Integer id) {
		return repository.findById(id);
	}

}
