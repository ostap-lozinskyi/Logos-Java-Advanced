package ua.service;

import java.security.Principal;

import ua.entity.User;
import ua.model.request.RegistrationRequest;

public interface UserService {

	void save(RegistrationRequest request);

	void updatePhotoUrl(Principal principal, String photoUrl);
	
	User findByEmail(String email);
}
