package ua.model.request;

import java.util.ArrayList;
import java.util.List;

import ua.entity.Meal;
import ua.entity.Place;

public class OrderRequest {

	private Integer id;

	private Place place;
	
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
