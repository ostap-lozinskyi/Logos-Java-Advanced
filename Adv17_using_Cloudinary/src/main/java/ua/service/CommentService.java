package ua.service;

import ua.entity.Comment;
import ua.model.request.CommentRequest;

public interface CommentService {

	void save(CommentRequest request);
	
	public CommentRequest findOneRequest(Integer id);
	
	Comment findByText(String text);

}
