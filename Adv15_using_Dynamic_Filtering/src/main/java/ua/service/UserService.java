package ua.service;

import java.security.Principal;

import ua.model.request.RegistrationRequest;

public interface UserService {

	void save(RegistrationRequest request);

	void savePhoto(Principal principal, String photoUrl);
}
