//package ua.validation.validator;
//
//import javax.validation.ConstraintValidator;
//import javax.validation.ConstraintValidatorContext;
//
//import org.springframework.stereotype.Component;
//
//import ua.repository.ComponentRepository;
//import ua.validation.annotation.UniqueComponent;
//
//@Component
//public class ComponentValidator implements ConstraintValidator<UniqueComponent, String> {
//
//	private final ComponentRepository repository;
//
//	public ComponentValidator(ComponentRepository repository) {
//		this.repository = repository;
//	}
//
//	@Override
//	public void initialize(UniqueComponent constraintAnnotation) {
//	}
//
//	@Override
//	public boolean isValid(String value, ConstraintValidatorContext context) {
//		return !repository...existsByName(value);
//	}
//
//}
