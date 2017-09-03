package ua;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

import ua.entity.Role;
import ua.entity.User;
import ua.repository.UserRepository;

@SpringBootApplication
public class CafeApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext run = SpringApplication.run(CafeApplication.class, args);
		addAdmin(run);
	}

	static void addAdmin(ConfigurableApplicationContext run) {
		UserRepository repository = run.getBean(UserRepository.class);
		User entity = repository.findByEmail("admin");
		if (entity == null) {
			PasswordEncoder encoder = run.getBean(PasswordEncoder.class);
			entity = new User();
			entity.setEmail("admin");
			entity.setPassword(encoder.encode("admin"));
			entity.setRole(Role.ROLE_ADMIN);
			repository.save(entity);
		}
	}
}
