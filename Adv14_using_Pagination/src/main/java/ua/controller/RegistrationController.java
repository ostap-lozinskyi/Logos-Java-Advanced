package ua.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.support.SessionStatus;

import ua.model.request.RegistrationRequest;
import ua.service.UserService;
import ua.validation.flag.UserFlag;

@Controller
public class RegistrationController {

	private final UserService service;

	public RegistrationController(UserService service) {
		this.service = service;
	}
	
	@GetMapping("/registration")
	public String registration(Model model) {
		model.addAttribute("registration", new RegistrationRequest());
		return "registration";
	}
	
	@PostMapping("/registration")
	public String save(@ModelAttribute("registration") @Validated(UserFlag.class) RegistrationRequest request,
			BindingResult br, Model model, SessionStatus status) {
		if (br.hasErrors())
			return "registration";
		service.save(request);
		return "redirect:/login";
	}
	
	@GetMapping("/login")
	public String login(Principal principal) {
		if(principal != null) System.out.println(principal.getName());
		return "login";
	}
}
