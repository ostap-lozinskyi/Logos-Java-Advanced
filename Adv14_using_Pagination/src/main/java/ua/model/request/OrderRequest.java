package ua.model.request;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.NotEmpty;

import ua.entity.Meal;
import ua.entity.Place;
import ua.validation.flag.OrderFlag;

public class OrderRequest {

	private Integer id;

	private Place place;
	
	@NotEmpty(message = "This field cannot be blank", groups = { OrderFlag.class })
	private List<Meal> meals = new ArrayList<>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Place getPlace() {
		return place;
	}

	public void setPlace(Place place) {
		this.place = place;
	}

	public List<Meal> getMeals() {
		return meals;
	}

	public void setMeals(List<Meal> meals) {
		this.meals = meals;
	}
	
}