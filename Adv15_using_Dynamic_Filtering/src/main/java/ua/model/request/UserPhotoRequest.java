package ua.model.request;

import ua.entity.Role;
import ua.validation.annotation.PasswordsEqual;
import ua.validation.flag.UserFlag;

@PasswordsEqual(message="Password does not match", groups = { UserFlag.class })
public class UserPhotoRequest {
	
	private Integer id;
	
	private String email;
	
	private String password;	
	
	private String photoUrl;
	
	private Role role;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
}
