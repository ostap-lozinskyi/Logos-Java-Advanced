package ua.service;

import java.io.File;
import java.security.Principal;
import java.util.List;

import ua.entity.User;
import ua.model.request.RegistrationRequest;
import ua.model.view.MealView;

public interface UserService {

	void save(RegistrationRequest request);

	void updateTableId(Principal principal, Integer tableId);
	
	User findByEmail(String email);
	
	void uploadPhotoToCloudinary(File toUpload, Principal principal);
	
	List<Integer> findUserMealsIds(User user);
}
