package ua.service;

import ua.entity.User;
import ua.model.request.RegistrationRequest;

public interface UserService {

	void save(RegistrationRequest request);

	void savePhoto(String s, User user);
}
