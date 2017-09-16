package ua.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ua.entity.Role;
import ua.entity.User;
import ua.model.request.RegistrationRequest;
import ua.model.request.UserPhotoRequest;
import ua.repository.UserRepository;
import ua.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	private final UserRepository repository;
	
	private final PasswordEncoder encoder;
	
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
	public void savePhotoUrl(UserPhotoRequest request, String photoUrl, User user) {
		user.setId(request.getId());
		user.setEmail(request.getEmail());
		user.setPassword(encoder.encode(request.getPassword()));
		user.setRole(request.getRole());
		user.setPhotoUrl(request.getPhotoUrl());		
		repository.save(user);		
	}	

	@Override
	public UserPhotoRequest findOneRequest(User user) {		
		UserPhotoRequest request = new UserPhotoRequest();
		request.setId(user.getId());
		request.setEmail(user.getEmail());
//		request.setPassword(user.getPassword());
		request.setRole(user.getRole());
		request.setPhotoUrl(user.getPhotoUrl());
		return request;
	}

}
