package ua;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import ua.entity.Role;
import ua.entity.User;
import ua.repository.UserRepository;

@SpringBootApplication
@ImportAutoConfiguration(classes = WebMvcAutoConfiguration.class)
public class CafeApplication extends WebMvcConfigurerAdapter {
	
	@Value("${file.path}")
	private String path;

	public static void main(String[] args) {
		ConfigurableApplicationContext run = SpringApplication.run(CafeApplication.class, args);
		addAdmin(run);
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		PageableHandlerMethodArgumentResolver resolver = new PageableHandlerMethodArgumentResolver();
		resolver.setOneIndexedParameters(true);
		argumentResolvers.add(resolver);
		argumentResolvers.add(resolver);
		super.addArgumentResolvers(argumentResolvers);
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
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/img/*").addResourceLocations("file:"+path);
		super.addResourceHandlers(registry);
	}
}
