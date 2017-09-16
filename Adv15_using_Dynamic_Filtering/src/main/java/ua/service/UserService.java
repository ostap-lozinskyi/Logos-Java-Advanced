package ua.service;

import ua.entity.User;
import ua.model.request.RegistrationRequest;
import ua.model.request.UserPhotoRequest;

public interface UserService {

	void save(RegistrationRequest request);
	
	void savePhotoUrl(UserPhotoRequest request, String photoUrl,  User user);

	UserPhotoRequest findOneRequest(User user);
	
}
