package ua.service;

import ua.entity.Comment;
import ua.model.request.CommentRequest;

public interface CommentService {

	Integer save(CommentRequest request);
	
	CommentRequest findOneRequest(Integer id);
	
	Comment findById(Integer id);

}
