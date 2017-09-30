package ua.service;

import java.io.File;
import java.security.Principal;
import java.util.List;

import ua.entity.User;
import ua.model.request.RegistrationRequest;

public interface UserService {

	void save(RegistrationRequest request);

	User findByEmail(String email);
	
	void uploadPhotoToCloudinary(File toUpload, Principal principal);
	
	List<Integer> findUserMealsIds(Principal principal);
}
