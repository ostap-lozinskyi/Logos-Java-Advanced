package ua.service.impl;

import java.security.Principal;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ua.entity.Role;
import ua.entity.User;
import ua.model.request.RegistrationRequest;
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
	public void updatePhotoUrl(Principal principal, String photoUrl) {
		String email=principal.getName();
		User user = repository.findByEmail(email);
		user.setPhotoUrl(photoUrl);		
		repository.save(user);		
	}
	
	public User findByEmail(String email) {
		return repository.findByEmail(email);
	};
	
}
