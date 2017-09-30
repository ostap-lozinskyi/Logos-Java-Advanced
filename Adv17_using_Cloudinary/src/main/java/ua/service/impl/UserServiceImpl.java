package ua.service.impl;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import ua.entity.Role;
import ua.entity.User;
import ua.model.request.RegistrationRequest;
import ua.model.view.MealView;
import ua.repository.UserRepository;
import ua.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	private final UserRepository repository;
	
	private final PasswordEncoder encoder;
	
	@Value("${cloudinary.url}")
	Cloudinary cloudinary = new Cloudinary();
	
	public UserServiceImpl(UserRepository repository, PasswordEncoder encoder) {
		this.repository = repository;
		this.encoder = encoder;
	}

	@Override
	public void save(RegistrationRequest request) {
		User user = new User();
		user.setEmail(request.getEmail());
		user.setPassword(encoder.encode(request.getPassword()));
		user.setRole(Role.ROLE_CLIENT);
		user.setPhotoUrl(request.getPhotoUrl());		
		repository.save(user);		
	}
	
	@Override
	public void updateTableId(Principal principal, Integer tableId) {
		String email=principal.getName();
		User user = repository.findByEmail(email);
		user.setTableId(tableId);		
		repository.save(user);		
	}
	
	public User findByEmail(String email) {
		return repository.findByEmail(email);
	};
	
	@Override
	public void uploadPhotoToCloudinary(File toUpload, Principal principal) {
		String email = principal.getName();
		User user = findByEmail(email);
		@SuppressWarnings("rawtypes")
		Map uploadResult;
		try {
			uploadResult = cloudinary.uploader().upload(toUpload,
					ObjectUtils.asMap("use_filename", "true", "unique_filename", "false"));
			String cloudinaryUrl = (String) uploadResult.get("url");
			String oldPhotoUrl = user.getPhotoUrl();
			if ((oldPhotoUrl != null) && (oldPhotoUrl.equals(cloudinaryUrl))) {
				user.setVersion(user.getVersion() + 1);
			} else {
				user.setVersion(0);
			}
			user.setPhotoUrl(cloudinaryUrl);
			repository.save(user);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public List<MealView> findUserMealsIds(User user) {
		return repository.findUserMealsIds(user.getId());
	}
	
}
